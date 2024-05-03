import React from 'react';
import css from './header.module.css';
import { clx } from '@utils/clx';
import { HeaderContent } from '../../profile-content-header/header-content.component';
import { IHeader } from './header';

export const Header: React.FC<IHeader> = ({ toggle, setToggle, isUpdateTask }) => {
  return (
    <div className={css['header']}>
      <div
        onClick={() => setToggle(true)}
        className={clx(
          toggle && css['header__headerContent-container-active'],
          css['header__headerContent-container']
        )}
      >
        <HeaderContent
          title="Созданные задачи"
          text={`
              Тут вы можете видеть список созданных вами задач.
            `}
        />
      </div>

      <div
        onClick={() => setToggle(false)}
        className={clx(
          !toggle && css['header__headerContent-container-active'],
          css['header__headerContent-container'],
          css['header__headerContent-container-right']
        )}
      >
        {isUpdateTask ? (
          <HeaderContent
            title="Редактирование задачи"
            text={`
              Тут вы можете редактировать свою задачу.
            `}
          />
        ) : (
          <HeaderContent
            title="Создать задачу"
            text={`
            Тут вы можете создать свою задачу.
          `}
          />
        )}
      </div>
    </div>
  );
};
