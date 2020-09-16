const configuration = (() => {
  const config_folder_name = 'gnice_config';

  const LABEL       = 'LABEL';
  const INBOX       = 'INBOX';
  const DESTINATION = 'DESTINATION';
  const PROCESSING  = 'PROCESSING';
  const UNSCREENED  = 'UNSCREENED';
  const EDIT        = 'EDIT'; 

  const destinations = {
    to_screen:    { icon: '👀', name: 'To Screen',       location: undefined,      type: LABEL, stage: UNSCREENED  },
    processing:   { icon: '⏳', name: '',                location: undefined,      type: LABEL, stage: PROCESSING  },
    edit:         { icon: '🛂', name: 'Redo Screen',     location: undefined,      type: LABEL, stage: EDIT        },
    inbox:        { icon: '✅ 💌', name: 'Inbox',        location: 'inbox',        type: INBOX, stage: DESTINATION },
    feed:         { icon: '✅ 📰', name: 'Feed',         location: 'feed',         type: LABEL, stage: DESTINATION },
    paper_trail:  { icon: '✅ 🗂', name: 'Paper Trail',  location: 'paper_trail',  type: LABEL, stage: DESTINATION },
    screened_out: { icon: '❌ 🗑', name: 'Screened Out', location: 'screened_out', type: LABEL, stage: DESTINATION },
  }
  const destination_keys = Object.keys(destinations);

  const labelName = (dest) => `${dest.icon} ${dest.name}`;
  const folderName = (dest) => `${dest.location}`;

  return { 
    LABEL,
    INBOX,
    DESTINATION,
    PROCESSING,
    UNSCREENED,
    EDIT,
    labelName,
    folderName,
    destinations,
    destination_keys,
    config_folder_name,
  }
})();
