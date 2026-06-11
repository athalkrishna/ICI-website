'use strict';

module.exports = {
  'enforce-design-system': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Enforce design system semantic classes and brand namespace',
        category: 'Best Practices',
        recommended: false,
      },
      fixable: null,
      schema: [],
    },
    create(context) {
      const navyGoldRegex = /(?<!brand-)\b(?:navy|gold)-\d+/;
      const grayRegex = /\bgray-(?:500|600)\b/;

      function checkString(node, str) {
        if (!str) return;

        const navyGoldMatch = str.match(navyGoldRegex);
        if (navyGoldMatch) {
          context.report({
            node,
            message: 'Raw navy/gold colour detected — use brand-navy-* or brand-gold-* instead (e.g. bg-brand-navy-900). See globals.css for semantic alternatives.',
          });
        }

        const grayMatch = str.match(grayRegex);
        if (grayMatch) {
          context.report({
            node,
            message: 'Use .text-muted or .text-muted-dark instead of raw gray utilities. See globals.css.',
          });
        }
      }

      function isClassPropOrFunc(node) {
        let current = node.parent;
        while (current) {
          if (current.type === 'JSXAttribute' && (current.name.name === 'className' || current.name.name === 'class')) {
            return true;
          }
          if (current.type === 'CallExpression') {
            const callee = current.callee;
            if (callee.type === 'Identifier' && ['cn', 'clsx', 'twMerge', 'cva'].includes(callee.name)) {
              return true;
            }
          }
          current = current.parent;
        }
        return false;
      }

      return {
        Literal(node) {
          if (typeof node.value === 'string' && isClassPropOrFunc(node)) {
            checkString(node, node.value);
          }
        },
        TemplateElement(node) {
          if (isClassPropOrFunc(node)) {
            checkString(node, node.value.raw);
          }
        },
      };
    },
  },
};
