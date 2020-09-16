const setupEnvironmentForConfiguration = (() => {

  const getOrCreateLabelHandle = (conf, dest) => {
    if (dest.type !== conf.LABEL) { throw `getOrCreateLabelHandle called with non-label: ${dest}` };
    let label_name = conf.labelName(dest);
    let handle = GmailApp.getUserLabelByName(label_name) || GmailApp.createLabel(label_name);
    if (!handle) { throw `getOrCreateLabelHandle couldn't make or find label for destination: ${dest}`}
    return handle;
  }

  const findChildFolderByName = (child_name, parent) => {
    let iterator = parent.getFoldersByName(child_name);
    while (iterator.hasNext()) {
      let curr = iterator.next();
      let parent_iterator = curr.getParents();
      while (parent_iterator.hasNext()) {
        let parent = parent_iterator.next();
        if (parent.getId() === parent.getId()) {
          return curr;
        }
      }
    }
  }

  const getOrCreateFolderHandle = (conf, root, dest) => {
    if (dest.stage !== conf.DESTINATION) { throw `getOrCreateFolderHandle called with non-destination: ${dest}` };
    let folder_name = conf.folderName(dest);
    let handle = findChildFolderByName(folder_name, root) || root.createFolder(folder_name);
    if (!handle) { throw `getOrCreateFolderHandle couldn't make or find folder for destination: ${dest}`}
    return handle;
  }

  return (conf) => {
    let root_folder = DriveApp.getRootFolder();
    if (!root_folder) { throw `setup could not access root folder`}; 
    let conf_folder = findChildFolderByName(conf.config_folder_name, root_folder) || root_folder.createFolder(conf.config_folder_name); 
    if (!conf_folder) { throw `setup could not make or find config folder: ${conf.config_folder_name}`}; 
    return conf.destination_keys.reduce((acc, key) => {
      let dest = conf.destinations[key];
      let label_handle = (dest.type === conf.LABEL) ? getOrCreateLabelHandle(conf, dest) : undefined;
      let folder_handle = (dest.stage === conf.DESTINATION) ? getOrCreateFolderHandle(conf, conf_folder, dest) : undefined;
      acc[key] = { type: dest.type, stage: dest.stage, folder: folder_handle, label: label_handle };
      return acc; 
    }, {})
  }
})();







