import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import linkedinlogo from '@/assets/icons/linkedinLogo.svg';
import instagramlogo from '@/assets/icons/instagramLogo.svg';
import youtubeLogo from '@/assets/icons/youtubeLogo.svg';
const Footer = () => {
    return (
        <div className={`${styles.footerWrapper}`}>
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLeft}>
                    <div className={styles.footerLogo}>
                        <p>EcoClean</p>
                    </div>
                    <p className= {styles.footerDescription}> EcoClean is your trusted partner in sustainable junk management. We simplify waste disposal, promote recycling, and reward you for contributing to a cleaner planet. Join us in building a greener future, one pickup at a time. Together, let's make eco-friendly living effortless and impactful.</p>
                    

                    <div className={styles.socialmediaLogoContainer}> 
                        <Link to ="https://www.youtube.com/" >
                             <img
                            src={youtubeLogo} 
                            alt="youtube Logo"
                            className={styles.youtubeLogo}
                            />
                        </Link> 
                        <Link to="https://www.linkedin.com/company/fiftyfivetechnologies/posts/?feedView=all">
                            <img
                                src={linkedinlogo}
                                alt="Linkedin Logo"
                                className={styles.socialmediaLogo}
                            /> 
                        </Link> 
                        
                        <Link to="https://www.linkedin.com/company/fiftyfivetechnologies/posts/?feedView=all" >
                            <img
                                src={instagramlogo}
                                alt="instagram Logo"
                                className={styles.socialmediaLogo}
                            />
                        </Link>                        
                    </div>
                </div>

                <div className={styles.linksContainer}>
                    <table>
                        <tr>
                            <td><Link to="/">Home</Link></td>
                            <td><Link to="/dashboard">Dashboard</Link></td>
                            <td><Link to="/profile">Profile</Link></td>
                            
                            
                        </tr>
                        <tr>
                        <td><div >Return & refund policy </div></td>
                            <td><Link to="/tnc">Terms and conditions</Link></td>
                            <td>info@ecoclean.com</td>  
                        </tr>
                        <tr>
                            <td><Link to="/dashboard/schedulepickup">junk pickup Scheduling</Link></td>
                            
                            <td><div >Privacy policy</div></td>
                            
                        </tr>  
                        
                    </table>
                </div>               
            </div>     
        </footer>
        <hr className={styles.footerDivider} />
        <p className={styles.copyright}>Copyright © 2025 ECoClean - All Rights Reserved</p>
        </div>
    );
};

export default Footer;