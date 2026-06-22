export default {
  name: 'module',
  title: 'Course Module',
  type: 'object',
  fields: [
    { name: 'title', title: 'Module Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'hours', title: 'Hours', type: 'number' },
  ],
};
