const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

var md = require('markdown-it')()
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-highlightjs'))
    .use(require('markdown-it-container'))
    .use(require('markdown-it-table-of-contents'), {forceFullToc: true, includeLevel: [1,2,3,4,5,6,7,8,9,10]})
    .use(require('markdown-it-github-headings'), {prefix: "", prefixHeadingIds: true})
    .use(require('markdown-it-footnote'));

router.get('/docs', function (req, res, next) {
    res.send(md.render(fs.readFileSync(path.join(__dirname, '../document.md'), 'utf8')))
});

module.exports = router;