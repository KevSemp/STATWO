import {
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCardContent,
	IonImg,
} from '@ionic/react';

export default function Card({
	title,
	subtitle,
	image,
	alt,
	children,
	href = undefined,
}) {
	return (
		<IonCard
			routerLink={href}
			href={href}
			routerDirection='forward'
			target={href ? '_self' : undefined}
		>
			{image && <IonImg src={image} alt={alt} className='ion-padding' />}
			{(title || subtitle) && (
				<IonCardHeader>
					{title && <IonCardTitle>{title}</IonCardTitle>}
					{subtitle && <IonCardSubtitle>{subtitle}</IonCardSubtitle>}
				</IonCardHeader>
			)}
			{children && <IonCardContent>{children}</IonCardContent>}
		</IonCard>
	);
}
