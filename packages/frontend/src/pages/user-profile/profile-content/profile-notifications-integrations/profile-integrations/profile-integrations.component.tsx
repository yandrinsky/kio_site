import css from './profile-integrations.module.css';
import { HeaderContent } from '../../profile-content-header/header-content.component';
import { UserSocialMediaField } from '@components/user-profile-fields/user-social-media-field/user-social-media-field.component';

export const ProfileIntegrations = () => {
    return (
        <div className={css['profile-integrations__information-board-container']}>
            <HeaderContent
                title="Интеграции"
                text="Вставьте html код на ваш сайт или поделитесь КИО в социальных сетях"
            />
            <UserSocialMediaField
                title="Добавьте новые социальные сети"
                footerText="За каждого приведенного участника с вашей ссылки мы оплатим 10% от стоимости конкурса."
            />
        </div>
    );
};
