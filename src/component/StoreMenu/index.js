import {
  ChangeMode,
  Feedback,
  Keyboard,
  Language,
  IconEmbed,
  IconFb,
  IconWhatApps,
  IconTwitter,
  IconCopyLink,
  IconLlinkedln,
  IconRediit,
  IconTele,
  IconEmail,
  IconLine,
  IconPinterest,
  Messages,
  IconReport,
  IconQRCode,
  IconUser,
  IconGoogle,
  IconKacaoTalk,
  IconInstagram,
  IconDelete,
} from '~/component/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import Login from '~/layouts/Modal/Login';
import SignUp from '~/layouts/Modal/SignUp';
import BtnSwitchTheme from '~/layouts/components/Header/BtnSwitchTheme';
export const MENU_ITEMS = [
  {
    icon: <Language />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          code: 'en',
          title: 'English',
        },
        {
          code: 'vi',
          title: 'Tiếng việt',
        },
      ],
    },
  },
  {
    icon: <Feedback />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <Keyboard />,
    title: 'Keyboard shortcuts',
  },
  {
    icon: <ChangeMode />,
    title: 'Dark mode',
    btn: <BtnSwitchTheme />,
  },
];

export const SHARE_MENU = [
  {
    icon: <IconEmbed />,
    title: 'Embed',
  },
  {
    icon: <IconFb />,
    title: 'Share to Facebook',
  },
  {
    icon: <IconWhatApps />,
    title: 'Share to WhatsApp',
  },
  {
    icon: <IconTwitter />,
    title: 'Share to Twitter',
  },
  {
    icon: <IconCopyLink />,
    title: 'Copy link',
  },
  {
    icon: <IconLlinkedln />,
    title: 'Share to Linkedln',
  },
  {
    icon: <IconRediit />,
    title: 'Share to Reddit',
  },
  {
    icon: <IconTele />,
    title: 'Share to Telegram',
  },
  {
    icon: <IconEmail />,
    title: 'Share to Email',
  },
  {
    icon: <IconLine />,
    title: 'Share to Line',
  },
  {
    icon: <IconPinterest />,
    title: 'Share to Pinterest',
  },
];
export const SHARE_MENU_1 = [
  {
    icon: <IconEmbed />,
    title: 'Embed',
  },
  {
    icon: <IconFb />,
    title: 'Share to Facebook',
  },
  {
    icon: <IconWhatApps />,
    title: 'Share to WhatsApp',
  },
  {
    icon: <IconTwitter />,
    title: 'Share to Twitter',
  },
  {
    icon: <IconCopyLink />,
    title: 'Copy link',
  },
];
export const SHARE_MENU_2 = [
  {
    icon: <IconLlinkedln />,
    title: 'Share to Linkedln',
  },
  {
    icon: <IconRediit />,
    title: 'Share to Reddit',
  },
  {
    icon: <IconTele />,
    title: 'Share to Telegram',
  },
  {
    icon: <IconEmail />,
    title: 'Share to Email',
  },
  {
    icon: <IconLine />,
    title: 'Share to Line',
  },
  {
    icon: <IconPinterest />,
    title: 'Share to Pinterest',
  },
];
export const ANOTHER_MENU = [
  {
    icon: <Messages width="1.6rem" height="1.6rem" />,
    title: 'Send Message',
  },
  {
    icon: <IconReport />,
    title: 'Report',
    cross: true,
  },
  {
    icon: <FontAwesomeIcon icon={faBan} style={{ fontSize: 16 }} />,
    title: 'Block',
    cross: true,
  },
];

export const MENU_VIDEO_ANOTHER = [
  {
    icon: <FontAwesomeIcon icon={faHeartCrack} />,
    title: 'Not interested',
  },
  {
    icon: <IconReport />,
    title: 'Report',
    cross: true,
  },
];

export const LOGIN_OPTIONS = [
  {
    id: 1,
    icon: <IconQRCode />,
    title: 'Use QR code',
    disable: true,
  },
  {
    id: 2,
    icon: <IconUser />,
    title: 'Use phone / email / username',
    disable: false,
    children: {
      title: 'Login',
      data: <Login />,
    },
  },
  {
    id: 3,
    icon: <IconFb width="20" height="20" />,
    title: 'Continue with Facebook',
    disable: true,
  },
  {
    id: 4,
    icon: <IconGoogle />,
    title: 'Continue with Google',
    disable: true,
  },
  {
    id: 5,
    icon: <IconTwitter width="20" height="20" />,
    title: 'Continue with Twitter',
    disable: true,
  },
  {
    id: 6,
    icon: <IconLine width="20" height="20" />,
    title: 'Continue with LINE',
    disable: true,
  },
  {
    id: 7,
    icon: <IconKacaoTalk />,
    title: 'Continue with KakaoTalk',
    disable: true,
  },
  {
    id: 8,
    icon: <FontAwesomeIcon icon={faApple} style={{ height: 20, width: 20 }} />,
    title: 'Continue with Apple',
    disable: true,
  },
  {
    id: 9,
    icon: <IconInstagram />,
    title: 'Continue with Instagram',
    disable: true,
  },
];
export const SIGNUP_OPTIONS = [
  {
    id: 1,
    icon: <IconUser />,
    title: 'Use phone or email',
    disable: false,
    children: {
      title: 'Sign up',
      data: <SignUp />,
    },
  },
  {
    id: 2,
    icon: <IconFb width="20" height="20" />,
    title: 'Continue with Facebook',
    disable: true,
  },
  {
    id: 3,
    icon: <IconGoogle />,
    title: 'Continue with Google',
    disable: true,
  },
  {
    id: 4,
    icon: <IconTwitter width="20" height="20" />,
    title: 'Continue with Twitter',
    disable: true,
  },
  {
    id: 5,
    icon: <IconLine width="20" height="20" />,
    title: 'Continue with LINE',
    disable: true,
  },
  {
    id: 6,
    icon: <IconKacaoTalk />,
    title: 'Continue with KakaoTalk',
    disable: true,
  },
];
export const MENU_LOGIN_SIGNUP = [
  {
    title: 'Log in to TikTok',
    data: LOGIN_OPTIONS,
  },
  {
    title: 'Sign up to TikTok',
    data: SIGNUP_OPTIONS,
  },
];
export const MENU_COMMENT = [
  {
    icon: <IconReport />,
    title: 'Report',
  },
];

export const MENU_EMOJI = [
  '😁',
  '😀',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '😳',
  '🥵',
  '🥶',
  '😱',
  '😨',
  '😰',
  '😥',
  '😯',
  '😦',
  '😧',
  '😮',
  '😲',
  '🥱',
  '😴',
  '🤤',
  '😪',
  '😵',
  '😵‍💫',
];
export const MENU_BODY = [
  '👋',
  '🤚',
  '🖐',
  '✋',
  '🖖',
  '👌',
  '🤏',
  '✌️',
  '🤞',
  '🤟',
  '🤘',
  '🤙',
  '👈',
  '👉',
  '👆',
  '🖕',
  '👇',
  '☝️',
  '👍',
  '👎',
  '✊',
  '👊',
  '🤛',
  '🤜',
  '👏',
  '🙌',
  '👐',
  '🤲',
  '🤝',
  '🙏',
  '✍️',
  '💅',
  '🤳',
  '💪',
];
export const MENU_REPRESENT = [
  {
    id: 0,
    icon: '😀',
  },
  {
    id: 1,
    icon: '👋',
  },
];
