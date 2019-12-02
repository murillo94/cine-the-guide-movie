import { Share } from 'react-native';

const ShareCustom = ({ message, url, title, dialogTitle }) =>
  Share.share(
    {
      message,
      url,
      title
    },
    {
      dialogTitle
    }
  );

export { ShareCustom as Share };
