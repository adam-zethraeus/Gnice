// Drive
function getDriveConfigFolder() {
  let root = DriveApp.getRootFolder();
  return findFolderImmediatelyInFolder(config.gnice_config_folder_name, root);
}

function createDriveConfigFolder() {
  let root = DriveApp.getRootFolder();
  return root.createFolder(config.gnice_config_folder_name);
}

function createFoldersInFolder(new_folder_names, folder) {
  return new_folder_names.map(name => [name, folder.createFolder(name)]);
}

function getFilesInFolder(file_names, folder) {
  return file_names.map(([id, full_name]) => [id, findFileImmediatelyInFolder(full_name, folder)]);
}

function createFilesInFolder(file_names, folder) {
  return file_names.map(([id, full_name]) => [id, folder.createFile(full_name, '')]);
}

function getFoldersInFolder(folder_names, folder) {
  return folder_names.map((id) => [id, findFolderImmediatelyInFolder(id, folder)]);
}

function findFolderImmediatelyInFolder(name, folder) {
  let iterator = folder.getFoldersByName(name);
  while (iterator.hasNext()) {
    let curr = iterator.next();
    let parent_iterator = curr.getParents();
    while (parent_iterator.hasNext()) {
      let parent = parent_iterator.next();
      if (parent.getId() === folder.getId()) {
        return curr;
      }
    }
  }
}

function findFileImmediatelyInFolder(name, folder) {
  let iterator = folder.getFilesByName(name);
  while (iterator.hasNext()) {
    let curr = iterator.next();
    let parent_iterator = curr.getParents();
    while (parent_iterator.hasNext()) {
      let parent = parent_iterator.next();
      if (parent.getId() === folder.getId()) {
        return curr;
      }
    }
  }
}

function getFilesImmediatelyInFolder(names, folder) {
  return names.map(name => findFileImmediatelyInFolder(name, folder));
}
