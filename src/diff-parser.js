  DiffParser.prototype.generateDiffJson = function(diffInput, config) {
        .replace(/\r\n?/g, '\n')
    var copyFrom = /^copy from "?(.+?)"?/;
    var copyTo = /^copy to "?(.+?)"?/;
    var renameFrom = /^rename from "?(.+?)"?/;
    var renameTo = /^rename to "?(.+?)"?/;
      } else if (currentFile && !currentFile.oldName && (values = getSrcFilename(line, config))) {
        currentFile.oldName = values;
      } else if (currentFile && !currentFile.newName && (values = getDstFilename(line, config))) {
        currentFile.newName = values;
  function getSrcFilename(line, cfg) {
    var prefixes = ["a/", "i/", "w/", "c/", "o/"];

    if (cfg.srcPrefix) prefixes.push(cfg.srcPrefix);

    return _getFilename('---', line, prefixes);
  }

  function getDstFilename(line, cfg) {
    var prefixes = ["b/", "i/", "w/", "c/", "o/"];

    if (cfg.dstPrefix) prefixes.push(cfg.dstPrefix);

    return _getFilename('\\+\\+\\+', line, prefixes);
  }

  function _getFilename(linePrefix, line, prefixes) {
    var FilenameRegExp = new RegExp('^' + linePrefix + ' "?(.+?)"?$');

    var filename;
    var values = FilenameRegExp.exec(line);
    if (values && values[1]) {
      filename = values[1];
      var matchingPrefixes = prefixes.filter(function(p) {
        return filename.indexOf(p) === 0;
      });

      if (matchingPrefixes[0]) filename = filename.slice(matchingPrefixes[0].length); // remove prefix if exists
    }

    return filename;
  }
