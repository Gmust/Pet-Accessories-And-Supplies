import { CatalogButton } from '@/src/components/HomePage/CatalogButton';
import { PetCards } from '@/src/components/HomePage/PetCards';
import Image from 'next/image';
import styles from './homePage.module.css';


const Home = () => {

  return (
    <div className={styles.container}>

      <div className={styles.cat}>
        <div className={styles.halfEllipse}></div>
        <div className={styles.imageWrapper}>
          <Image src={'/cat.png'} alt={'cat picture'} fill className={styles.imageWrapper} />
        </div>
      </div>

      <div className={styles.title}>
        <h1>
          Goods for Pets
        </h1>
        <h3>
          Online shop for whole world
        </h3>
      </div>

      <div className={styles.pets}>
        <PetCards />
      </div>

      <div className={styles.btn}>
        <CatalogButton />
      </div>

    </div>
  );
};


export default Home;