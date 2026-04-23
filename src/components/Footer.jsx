/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/
import GitHubIcon from '@mui/icons-material/GitHub';
import GMobiledataIcon from '@mui/icons-material/GMobiledata';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import '../css/Footer.css';

function Footer() {
  const footerStyle = {
    backgroundColor: '#282c34',  // Set my desired background color
    color: '#FF00FF',  // Set my desired text color
    padding: '20px',
    textAlign: 'center',
  };

  const iconStyle = {
    fontSize: '24px',
    margin: '0 5px',
    color: '#FF00FF',  // Set my desired icon color
  };

  return (
    <footer style={footerStyle}>
      <p>Assignment1 - COS30049 </p>
      <p>Copyright &copy; Duc Thinh, Phong Luu, Minh Huy </p>
      <div>
        <a href="https://github.com/thinhpham1807" target="_blank" rel="noopener noreferrer">
          <GitHubIcon style={iconStyle} />
        </a>
        <span> | </span>
        <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
          <GMobiledataIcon style={iconStyle} />
        </a>
        <span> | </span>
        <a href="https://www.facebook.com/your-facebook" target="_blank" rel="noopener noreferrer">
          <FacebookIcon style={iconStyle} />
        </a>
        <span> | </span>
        <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer">
          <InstagramIcon style={iconStyle} />
        </a>
        <span> | </span>
        <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
          <TwitterIcon style={iconStyle} />
        </a>
        <span> | </span>
        <a href="https://www.youtube.com/your-youtube" target="_blank" rel="noopener noreferrer">
          <YouTubeIcon style={iconStyle} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;