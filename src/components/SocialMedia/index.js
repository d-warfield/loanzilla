import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DISCORD from "assets/icons/social/discord.svg";
import TWITTER from "assets/icons/social/twitter.svg";
import REDDIT from "assets/icons/social/reddit.svg";
import TELEGRAM from "assets/icons/social/telegram.svg";
import GITHUB from "assets/icons/social/github.svg";
import WebIcon from "@mui/icons-material/Web";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: var(--p-border-radius);
  background-color: white;
  box-shadow: var(--p-b-s);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: var(--p-border);
  cursor: pointer;
  padding: 12px;
`;

const Icon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.3rem;
  width: 1.3rem;
`;

export default function SocialMedia({ etherscanTokenInfo }) {
  const [socials, setSocials] = useState();
  const icons = [
    <WebIcon style={{ color: "black", fontSize: 20 }} />,
    <Icon src={DISCORD} />,
    <Icon src={TWITTER} />,
    <Icon src={REDDIT} />,
    <Icon src={TELEGRAM} />,
    <Icon src={GITHUB} />,
  ];

  useEffect(() => {
    if (etherscanTokenInfo) {
      const picked = (({
        website,
        discord,
        twitter,
        reddit,
        telegram,
        github,
      }) => ({
        website,
        discord,
        twitter,
        reddit,
        telegram,
        github,
      }))(etherscanTokenInfo);

      setSocials(picked);
    }
  }, [etherscanTokenInfo]);

  return (
    <Container>
      {socials && (
        <>
          {Object?.keys(socials)?.map((social, index) => {
            if (socials[social] != "") {
              return (
                <IconContainer
                  key={index}
                  onClick={() => window.open(socials[social])}
                >
                  {icons[index]}
                </IconContainer>
              );
            }
          })}
        </>
      )}
    </Container>
  );
}
