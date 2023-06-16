import {
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCardContent,
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
		<IonCard href={href} target={href ? '_self' : undefined}>
			{image && (
				<picture>
					<img src={image} alt={alt} className='ion-padding' />
				</picture>
			)}
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
