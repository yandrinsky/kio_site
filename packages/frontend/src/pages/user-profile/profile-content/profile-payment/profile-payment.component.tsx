import { UserOfferField } from '@components/user-profile-fields/user-offer-field/user-offer-field.component';
import { HeaderContent } from '../profile-content-header/header-content.component';
import css from './profile-payment.module.css';
import { UserInformationBoard } from '@components/ui-kit/user-profile-information-board/user-data-information-board/user-information-board.component';

export const ProfilePayment = () => {
    return (
        <div className={css['profile-payment__forms']}>
            <HeaderContent
                title="Оплата"
                text={`
          Свяжите свой Личный кабинет с KIO со стторонним сервисом, 
          чтобы использовать его для оплаты.
        `}
            />
            <UserOfferField
                title="Метод оплаты"
                subtitle="Добавьте новый метод оплаты с помощью карты или онлайн-кошелька"
                footerText="Можно добавить не более трех кредитных, дебетовых или предоплаченных карт."
            />
            <div className={css['profile-payment__information-board-container']}>
                <UserInformationBoard
                    title="#### #### #### 3517"
                    iconSrc="/credit-card-regular.svg"
                    statusIcon="/ellipsis-vertical-solid.svg"
                />
                <UserInformationBoard
                    title="#### #### #### 2200"
                    iconSrc="/credit-card-regular.svg"
                    statusIcon="/ellipsis-vertical-solid.svg"
                />
            </div>
        </div>
    );
};
