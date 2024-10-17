import React from 'react';
import styled, { keyframes } from 'styled-components';
import NavigationBar from './NavigationBar'; // Import the navigation bar component

// Gradient Animation Keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main Container
const AboutUsContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: row; /* Default to row layout for larger screens */

  /* Media Query for Mobile */
  @media (max-width: 768px) {
    flex-direction: column; /* Stack sections vertically on smaller screens */
  }
`;

// Left Section with Gradient Background and Animation
const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(270deg, #003366, #ffcc00);  /* Blue to Yellow Gradient */
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  padding: 20px;
`;

// Moving Text Animation for School Name
const SchoolName = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

// Right Section for Content, Navigation, and Google Maps
const RightSection = styled.div`
  flex: 1;
  position: relative;
  padding: 40px;
  background-color: #f1f5ff; /* Light blue background */
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Media Query for Mobile */
  @media (max-width: 768px) {
    padding: 20px; /* Adjust padding for smaller screens */
  }
`;

// Title and Text Styles
const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1px #003366;  /* Add outline stroke in blue color */
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.6); /* White background with 60% transparency */
  padding: 10px; /* Optional: Add padding for better text visibility */
  border-radius: 15px; /* Adjust the value for the roundness */
`;

const TextBlock = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const HighlightText = styled.span`
  color: #ff6600; /* Orange */
  font-weight: bold;
`;

// Contact Information Styling
const ContactDetails = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

// Google Maps iframe styling
const MapIframe = styled.iframe`
  border: none;
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const AboutUs = () => {
  return (
    <AboutUsContainer>
      {/* Left Section with Gradient */}
      <LeftSection>
        <SectionTitle>About Us</SectionTitle>
        <SchoolName>Sulekha Devi Mission School</SchoolName>
      </LeftSection>

      {/* Right Section with Content, Navbar, and Google Maps */}
      <RightSection>
        {/* Navigation Bar */}
        <NavigationBar /> {/* Use the navigation bar component */}

        <div>
          <TextBlock>
            We provide a nurturing environment for students from
            <HighlightText> Nursery </HighlightText> to
            <HighlightText> 7th grade</HighlightText>,
            located in <HighlightText> Tesobathan, Sundarpahari</HighlightText>.
          </TextBlock>
          <TextBlock>
            <HighlightText>Principal: Mr. Arvind Kapri</HighlightText> leads our institution with a vision for academic excellence.
          </TextBlock>

          <ContactDetails>
            <ContactItem>📞 Contact Numbers: 8757040290 / 6202326183</ContactItem>
            <ContactItem>📧 Email: sdmschoolteso@gmail.com</ContactItem>
          </ContactDetails>
        </div>

        {/* Google Maps iframe */}
        <MapIframe
          src="https://maps.google.com/maps?q=Sulekha%20Devi%20Mission%20School%20Tesobathan%20Sundarpahari&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
        ></MapIframe>
      </RightSection>
    </AboutUsContainer>
  );
};

export default AboutUs;
