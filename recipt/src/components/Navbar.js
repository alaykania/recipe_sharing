import React from "react";
import '../style/navbar.css';
const Navbar=()=>
{
    return(
        <nav class="navbar">
		<div class="container">
			<h1 class="Logo">Recipe Sharing</h1>
			<ul class="navbar-links">

				<li><a href="/">Home</a></li>
				<li><a href="/upload">Upload Recipe</a></li>
				
			</ul>
			
		</div>
	</nav>
    )
}
export default Navbar;