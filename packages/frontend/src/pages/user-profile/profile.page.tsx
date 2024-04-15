import React from 'react';
import css from './profile.module.css';
import { Fragment, useState } from 'react';
import { VerticalNavbar } from '@components/ui-kit/vertical-navbar/vertical-navbar.component';
import { Layout } from '@components/layout/layout.component';
import { ProfileHeader } from './profile-header/profile-header.component';
import { UserProfileTabs, items } from './profile.utils';
import { useQueryParams } from '../../history/use-query/use-query-params';

export const UserProfile: React.FC = () => {
  const [profileTab, _] = useQueryParams();
  const [activeTab, setActiveTab] = useState(
    profileTab.profileTab ? profileTab.profileTab : UserProfileTabs[0].name
  );
  return (
    <div className={css.page}>
      <Layout withNav />
      <ProfileHeader />
      <div className={css['user-profile__container']}>
        <VerticalNavbar items={items} setIsActive={setActiveTab} />

        <div className={css['user-profile__tab']}>
          {UserProfileTabs.filter(tab => tab.name === activeTab).map(tab => (
            <Fragment key={'child_' + tab.name}>{tab.children}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
