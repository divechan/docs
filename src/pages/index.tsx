import './styles.module.css'

import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styled from '@emotion/styled'
import Telegram from '@site/static/img/telegram.svg'
import Discord from '@site/static/img/discord.svg'
import X from '@site/static/img/X.svg'
import Mainnet from '@site/static/img/mainnet.svg'
import Npm from '@site/static/img/npm.svg'
import UGP from '@site/static/img/UGP.png'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'
import { TraceEvent } from '@uniswap/analytics'
import {
  BrowserEvent,
  DocsHomepageElementName as ElementName,
  DocsSectionName as SectionName,
  SharedEventName,
} from '@uniswap/analytics-events'
import React from 'react'
import { ArrowUpRight as LinkIcon, BookOpen, HelpCircle, Info, MessageCircle } from 'react-feather'



export const actions = [
  {
    title: 'What is Steam Exchange?',
    icon: HelpCircle,
    to: '/steamexchange/steam-exchange-overview',
    text: `Learn about Steam Exchange and its business registrations`,
  },
  {
    title: 'What is Rails Network?',
    icon: HelpCircle,
    to: '/railsnetwork/rails-address-information',
    text: `Learn more about the Rails Network blockchain and PoWbA`,
  },
  {
    title: 'Rails Network Smart Contracts',
    icon: BookOpen,
    to: '/contracts/v2/overview',
    text: `Learn more about the key smart contracts that drive the Rails Network protocols`,
  },
]

export const developerLinks = [
  {
    title: 'Deployment addresses',
    href: 'https://explore.steamexchange.io/address/0xAdD2FC2189dA02E4122E6D734094bF1474516AD0',
    icon: Mainnet,
  },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 960px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    max-width: 100%;
    margin: 0 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const TwoRow = styled(Row)`
  grid-template-columns: 1fr 1fr;
  grid-gap: 48px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 350px;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 5px;
  border: 1px solid #d28a1e;
  /* flex: 1 1 0px; */

  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`

const CenterCard = styled(Card)`
  min-width: 250px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0px;
  }
`

const ShadowCard = styled(Card)`
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  background-color: #0c1d3110;
  backdrop-filter: blur(10px);
  min-height: 200px;
  /* background-color: var(--ifm-color-emphasis-0); */
`

const WideCard = styled(ShadowCard)`
  max-height: auto;

  @media (max-width: 960px) {
    margin: 0 2rem;
    max-height: fit-content;
    width: fit-content;
  }
`

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 0.5rem;
`

const LinkIconWrapper = styled.div`
  opacity: 0.25;
`

const TopSection = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const LinkRow = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  a h3 {
    color: black !important;
  }
`

const DocsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  position: relative;
`

const StyledImage = styled(ThemedImage)`
  position: relative;
  z-index: -1;
  width: 100%;
  object-fit: cover;
`

const StyledTitleImage = styled(StyledImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  position: absolute;
  opacity: 0.2;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`

const HideMedium = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`

const StyledIcon = styled.div`
  svg {
    fill: #FFFFFF; // No quotes around the color value
  }
`;


export default function Home() {
  return (
    <Layout title={`Rails Network Docs`} description="Technical Documentation For the Rails Network Ecosystem">
      <Container>
        <DocsHeader>
          <div
            style={{
              padding: '4rem 0  ',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 style={{ fontWeight: 600 }}> Welcome to the Rails Network Technical Documentation</h1>
            
          </div>
          <StyledTitleImage
            sources={{
              light: useBaseUrl('https://github.com/divechan/brandkit/blob/main/10.jpg?raw=true'),
              dark: useBaseUrl('https://github.com/divechan/brandkit/blob/main/10.jpg?raw=true'),
            }}
          />
          <Row>
            {actions.map((action) => (
              <TraceEvent
                key={action.to}
                element={action.to}
                events={[BrowserEvent.onClick]}
                name={SharedEventName.PAGE_CLICKED}
                section={SectionName.WELCOME_LINKS}
              >
                <Link style={{ textDecoration: 'none' }} to={action.to}>
                  <ShadowCard key={action.title}>
                    <TopSection>
                      <IconWrapper>
                        <action.icon style={{ width: '24px' }} />
                      </IconWrapper>
                      <LinkIconWrapper>
                        <LinkIcon />
                      </LinkIconWrapper>
                    </TopSection>
                    <h3 style={{ marginBottom: '.75rem', fontWeight: 500 }}>{action.title}</h3>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 300 }}>{action.text}</p>
                  </ShadowCard>
                </Link>
              </TraceEvent>
            ))}
          </Row>
        </DocsHeader>
        

        
        <TwoRow
          style={{
            gap: '48px',
            alignItems: 'center',
          }}
        >
          
          
                
                      
          
        </TwoRow>
        <Row>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            element={ElementName.DISCORD}
            section={SectionName.BOTTOM_MENU_LINKS}
            name={SharedEventName.PAGE_CLICKED}
          >
            <Link style={{ textDecoration: 'none' }} href={'https://t.me/SteamXchangeOfficial'}>
              <CenterCard>
                <Telegram style={{ width: '48px', height: '48px' }} />
                <div>
                  <h3>Telegram</h3>
                  <p>Join our thriving Community.</p>
                </div>
              </CenterCard>
            </Link>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            element={ElementName.GRANTS}
            section={SectionName.BOTTOM_MENU_LINKS}
            name={SharedEventName.PAGE_CLICKED}
          >
            <Link style={{ textDecoration: 'none' }} href={'https://twitter.com/steam_exchange'}>
              <CenterCard>
                <X style={{ width: '48px', height: '48px' }} />
                <div>
                  <h3>X</h3>
                  <p>Follow us on X for news and updates.</p>
                </div>
              </CenterCard>
            </Link>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            section={SectionName.BOTTOM_MENU_LINKS}
            element={ElementName.GITHUB}
            name={SharedEventName.PAGE_CLICKED}
          >
            <Link style={{ textDecoration: 'none' }} href={'https://discord.gg/qD4YqBaEN2'}>
              <CenterCard>
                <StyledIcon>
                  <Discord style={{ width: '48px', height: '48px' }} />
                </StyledIcon>
                <div>
                  <h3>Discord</h3>
                  <p>Join our Discord community.</p>
                </div>
              </CenterCard>
            </Link>
          </TraceEvent>
        </Row>
        
      </Container>
    </Layout>
  )
}
