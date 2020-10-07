import React, { useState, useCallback } from 'react';

import TransitionRotate from './TransitionRotate';
import Button from '../../Button';

export default {
    title: 'Transitions/TransitionRotate',
    component: TransitionRotate,

};

export const Default = () => {
    const [isRotated, setIsRotated] = useState(false);
    const handleToggle = useCallback(() => setIsRotated(!isRotated), [isRotated, setIsRotated]);

    return (
        <>
            <Button onClick={handleToggle}>Toggle</Button>
            <TransitionRotate interval={500} isRotated={isRotated}>
                Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.
                De carne lumbering animata corpora quaeritis. Summus brains sit​​,
                morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.
                Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi
                dentevil vultus comedat cerebella viventium. Qui animated corpse,
                cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater,
                suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum
                defunctis go lum cerebro. Nescio brains an Undead zombies.
                Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.
            </TransitionRotate>
        </>
    );
};
