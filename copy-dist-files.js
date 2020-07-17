const ncp = require('ncp').ncp;

[
  {
    source: 'projects/angular-line-awesome/icons',
    dest: 'dist/angular-line-awesome/icons'
  },
  {
    source: 'README.md',
    dest: 'dist/angular-line-awesome/README.md'
  }
].map(f => {
  ncp(f.source, f.dest, err => {
    if (err) {
      return console.error(err);
    }
    console.log(`${f.source} copied to the dist folder`);
  });
});
