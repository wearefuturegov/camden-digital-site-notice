import PropTypes from 'prop-types'
import styles from '../styles/Share.module.css'
import Image from 'next/image'

const Share = (props) => {
  const shareUrl = encodeURIComponent(`https://camden-digital-site-notice.netlify.app/planning-applications/${props.applicationNumber}`);
  const shareMessage = encodeURIComponent('Check out this Camden planning application');

  const twitterLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareMessage}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Share with your&nbsp;community</h2>

      <div className={styles.shareIcons}>
        <a className={styles.shareIcon} href={twitterLink} target='_blank' rel='noreferrer'>
            <Image src="/icons/sharing/twitter.svg" alt="Share on Twitter" width={52} height={52} />
        </a>
        <a className={styles.shareIcon} href={fbLink} target='_blank' rel='noreferrer'>
          <Image src="/icons/sharing/facebook.svg" alt="Share on Facebook" width={52} height={52} />
        </a>
      </div>

      <p>
        Get other people involved, together we can make a difference!
      </p>
    </div>

  )
}

Share.propTypes = {
  applicationNumber: PropTypes.string.isRequired
}

export default Share;