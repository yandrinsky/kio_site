import React from 'react';
import css from './profile.module.css';
import { Fragment, useState } from 'react';
import { VerticalNavbar } from '@components/ui-kit/vertical-navbar/vertical-navbar.component';
import { Layout } from '@components/layout/layout.component';
import { ProfileHeader } from './profile-header/profile-header.component';
import { userProfileTabs, userNavbarItems, adminProfileTabs, adminNavbarItems } from './profile.utils';
import { useQueryParams } from '../../history/use-query/use-query-params';
import { useMeRequest } from '@api/index';

export const UserProfile: React.FC = () => {
  const [profileTab, _] = useQueryParams();

  const { data } = useMeRequest();
  const profileTabs = data?.role === 'Admin' ? adminProfileTabs : userProfileTabs;
  const navbarItems = data?.role === 'Admin' ? adminNavbarItems : userNavbarItems;

  const [activeTab, setActiveTab] = useState(
    profileTab.profileTab ? profileTab.profileTab : profileTabs[0].name
  );

  return (
    <div className={css.page}>
      <Layout withNav />
      <ProfileHeader />
      <div className={css['user-profile__container']}>
        {data?.role === 'Admin' ? (
          <VerticalNavbar items={adminNavbarItems} setIsActive={setActiveTab} />
        ) : (
          <VerticalNavbar items={userNavbarItems} setIsActive={setActiveTab} />
        )}

        <div className={css['user-profile__tab']}>
          {profileTabs
            .filter(tab => tab.name === activeTab)
            .map(tab => (
              <Fragment key={'child_' + tab.name}>{tab.children}</Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
