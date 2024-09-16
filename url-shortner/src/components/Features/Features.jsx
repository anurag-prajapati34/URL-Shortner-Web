import React from 'react'
import {NavLink} from 'react-router-dom'
import './Features.css'

const Features = () => {
  return (
    <div className='w-full text-start'>
<h1 className='feature-area-heading'>FEATURES</h1>
<h1 className='feature-area-subheading'>Unlock Powerful Tools: Simplify, Analyze, and Share with Ease</h1>
<div className='show-features'>

<div className='feature'>
    {/* //icon */}
    <i class="fa-solid fa-link icon"></i>
    {/* //feature name */}
    <h1 className='feature-name'>Short URL</h1>
    {/* //description */}
    <p className='feature-desc'>Instantly transform long and complex URLs into sleek, easy-to-share links. Simplify your online presence and make your content more accessible.</p>
    {/* //call to action button */}
    <NavLink to={'/'} className='btn'>Learn more</NavLink>
</div>


<div className='feature'>
    {/* //icon */}
    <i class="fa-solid fa-chart-line icon"></i>
    {/* //feature name */}
    <h1 className='feature-name'>URL Analytics</h1>
    {/* //description */}
    <p className='feature-desc'>Gain valuable insights into your shortened links. Track clicks, monitor performance, and optimize your strategy based on real-time data.</p>
    {/* //call to action button */}
    <NavLink to={'/url-analytics'} className='btn'>Learn more</NavLink>
</div>


<div className='feature'>
    {/* //icon */}
    <i class="fa-solid fa-qrcode icon"></i>
    {/* //feature name */}
    <h1 className='feature-name'>QR Code</h1>
    {/* //description */}
    <p className='feature-desc'>Convert any URL into a QR code with a single click. Perfect for offline sharing, posters, or quick access via mobile devices.</p>
    {/* //call to action button */}
    <NavLink to={'/qr-code'} className='btn'>Learn more</NavLink>
</div>


</div>


    </div>
  )
}

export default Features