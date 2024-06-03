import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonRow, IonText,
    useIonViewWillEnter
} from '@ionic/react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useEffect, useState } from 'react';
import {handleGetUserInfo} from "../../utils/firebase.js";
import {getResultsById} from "../../utils/firebase.js";
import { motion } from 'framer-motion';
import {camera} from "ionicons/icons";
import {updateProfilePhoto} from "../../utils/firebase.js";
import styles from './Profile.module.css';
export default function Profile() {
    const [imageProfile, setImageProfile] = useState('');
    const [results, setResults] = useState([]);
    useIonViewWillEnter(() => {
        const user = handleGetUserInfo();
        getResultsById(user.uid).then((result)=>{setResults(result)});
        updateProfilePhoto().then((result)=>{});
        setImageProfile(user.photoURL)
    });





    return (
        <BasicLayout>
            <IonGrid class={`ion-text-center ion-no-padding`}>
                <IonRow class='ion-justify-content-center ion-margin-bottom'>
                    <IonAvatar  class="profile-pic-container">
                        <img alt="Silhouette of a person's head" src={imageProfile} />

                    </IonAvatar>

                </IonRow>
                <IonRow className='ion-justify-content-center'>
                    <IonText color='dark'>
                        <h1>Historial de resultados:</h1>
                    </IonText>
                </IonRow>
                    {results.map((element,index) =>(
                        <IonRow>
                            <IonCol size='12' gap={2}>
                                <motion.div
                                    key={index}
                                    initial={{ x: '-100vw' }}
                                    animate={{ x: 0 }}
                                    transition={{ type: 'spring', stiffness: 120, delay: index * 0.1 }}>
                                    <IonCard
                                        color='dark'
                                        style={{
                                            backgroundColor:
                                                'var(--ion-toolbar-background, var(--ion-background-color, #fff))',
                                            color: 'var(--ion-toolbar-color, var(--ion-text-color, #424242))',
                                        }}
                                    >
                                        <IonCardContent
                                            style={{
                                                textAlign: 'center',
                                                fontSize: '1rem',
                                            }}
                                        >
                                            {element}
                                        </IonCardContent>
                                    </IonCard>
                                </motion.div>
                            </IonCol>
                        </IonRow>
                    ))}


            </IonGrid>
        </BasicLayout>
    );
}
