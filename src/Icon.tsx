import React, { FC } from 'react';
import { WhpptIconDashboard } from './icons/Dashboard';
import { WhpptIconFooter } from './icons/Footer';
import { WhpptIconGlobe } from './icons/Globe';
import { WhpptIconNewPage } from './icons/NewPage';
import { WhpptIconPageSettings } from './icons/PageSettings';
import { WhpptIconPointer } from './icons/Pointer';
import { WhpptIconPublish } from './icons/Publish';
import { WhpptIconSave } from './icons/Save';
import { WhpptIconSettings } from './icons/Settings';
import { WhpptIconNav } from './icons/Nav';
import { WhpptIconLogout } from './icons/Logout';
import { WhpptIconBruce } from './icons/WhpptBruce';
import { WhpptIconClose } from './icons/Close';

export const WhpptIcon: FC<{ is: String }> = ({ is }) => {
  if (is === 'pointer') return <WhpptIconPointer></WhpptIconPointer>;
  if (is === 'new-page') return <WhpptIconNewPage></WhpptIconNewPage>;
  if (is === 'save') return <WhpptIconSave></WhpptIconSave>;
  if (is === 'nav') return <WhpptIconNav></WhpptIconNav>;
  if (is === 'footer') return <WhpptIconFooter></WhpptIconFooter>;
  if (is === 'publish') return <WhpptIconPublish></WhpptIconPublish>;
  if (is === 'globe') return <WhpptIconGlobe></WhpptIconGlobe>;
  if (is === 'settings') return <WhpptIconSettings></WhpptIconSettings>;
  if (is === 'page-settings')
    return <WhpptIconPageSettings></WhpptIconPageSettings>;
  if (is === 'dashboard') return <WhpptIconDashboard></WhpptIconDashboard>;
  if (is === 'logout') return <WhpptIconLogout></WhpptIconLogout>;
  if (is === 'bruce') return <WhpptIconBruce></WhpptIconBruce>;
  if (is === 'close') return <WhpptIconClose></WhpptIconClose>;
  return <div></div>;
};
