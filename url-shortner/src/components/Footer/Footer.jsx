import React from 'react'
import './Footer.css'

const Footer = () => {
///social links
  const linkedin='https://www.linkedin.com/in/anurag-prajapati34/'
  const github='https://github.com/anurag-prajapati34'
  const twitter='https://x.com/anurag_x34'


  return (
    <div className='footer-container '>

<p><i>Developed & Designed by</i> <b>@Anurag prajapati</b></p>


{/*my social accounts */}
<div className='socials'>

<div onClick={()=>window.open(linkedin,'_blank')} className='social-icon'><i   class="fa-brands fa-linkedin "></i></div>
<div onClick={()=>window.open(github,'_blank')} className='social-icon'><i   class="fa-brands fa-github "></i></div>
<div onClick={()=>window.open(twitter,'_blank')} className='social-icon'><i   class="fa-brands fa-x-twitter"></i></div>
<div onClick={()=>window.open('mailto:prajapatianurag73240@gmail.com')} className='social-icon'><i class="fa-solid fa-envelope"></i></div>

</div>

    </div>
  )
}

export default Footer