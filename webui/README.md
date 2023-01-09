# AskBitcoin

Game Design Document for https://shawars.com

<img src="https://github.com/Krypt1k86/shawars-gdd/blob/master/sharwars.jpeg" alt="shawars" style="zoom: 67%;" />

A 21e8 & Infinite Game Co. production

## Project Description

Sha Wars allows individuals or community members to gauge sentiment, resolve conflicts as well as bet on the outcomes of disputes that have been submitted to a distributed network of players.

1. Characters
2. Story
   - 2.1 Theme
3. Story Progression
4. Gameplay
   - 4.1 Goal
   - 4.2 User Skills
   - 4.3 Game Mechanics
   - 4.4 Powerups
   - 4.5 Progression & Challenge
   - 4.6 Losing
5. Art style
6. Sounds
7. Technical description
8. Marketing & Funding
   - 8.1 Demographics
   - 8.2 Platforms & Monetization
   - 8.3 Localization
9. Other ideas

## 1. Characters

Characters/Players will be matched up against one another through crowdsourced submissions and voting via Sha Wars hosted polls.
There will be multiple trading pairs (matchups) that a player can choose to interact with and no default characters.

<img src="https://github.com/Krypt1k86/shawars-gdd/blob/master/choose%20your%20fighter.jpg" alt="matchup" style="zoom: 37%;" />

## 2. Story

Each character/player will have a unique back story based on their experiences within their respective fields and graphical artwork to accompany their player card and trading pair.
Trading pair matchups could range from future world leaders going head to head, to your favorite internet guru’s and thought leaders in order to find out who the market feels is the champion of their respective matchup.

### 2.1. Theme

This is a game that revolves around Proof of Work and hashing content. It’s about risk, finance, and reputation. All conflicts can be weighed In upon by the active participants giving a true market sentiment on a given issue at a specific time.

The artistic theme relates to classic 8-bit games as the aesthetic and player matchup’s of these games arguably still remain top of their category with high visual appeal and easy to render design.

<img src="https://github.com/Krypt1k86/shawars-gdd/blob/master/rumble.jpeg" alt="rumble" style="zoom: 17%;" />

## 3. Story Progression

The game starts with a trading pair (matchup) being crowdsourced from the community. Once there is momentum behind this matchup, a Sha War may be submitted with a start and end time (block height).

When the matchup is listed and trading is active, players can vote on who they think is right/will win via micro-transactions and compute power.

After a player wins, they then would either advance to the next round of the tournament or have won the conflict if the matchup is solely a head to head competition.

Contestants win disputes and reputation points while players voting (submitting hashes) could win via betting within a prediction market that could arise.

## 4. Gameplay

Individuals not hosted as a trading pair can interact with the game via voting buttons that send a specific target and hash to be mined on the bitcoin network.

All votes submitted will be able to be viewed in real time via the transaction index as well as at https://sha.center.

There is a live chat element for players to communicate and discuss current sentiment, future trading pairs, trading pair status, etc… as well.

### 4.1. Goals

Overall (long term): Introduce an easy to use platform for hashing content and distributing conflict resolution/sentiment of the market to the wider world, and create a protocol for resolving conflicts on-chain.

Gameplay (short term): Defeat your opponent and/or become the most powerful player in the game of bitcoin within the 21e8 universe.

### 4.2. User Skills

- Clicking button(s)
- Manage resources
- Strategy

### 4.3. Game Mechanics

The game mechanics are quite simple. A player can interact with the game by using the vote power button to apply proof of work towards whichever hash in a trading pair that they would like to support (see win).

Players can view the “live feed” activity directly on the sha wars homepage as well as interact with other players via the Checksums chat-box.

A player is not limited to a single vote and can place wagers/predictions on the outcome of individual trading pairs.

Those involved in a dispute can choose whether the winner is decided by most proof of work or highest power rating at the end of a given time period.

### 4.4. Power-ups

When submitting a hash to be accounted for, the target used defines the amount of power associated with a player’s vote.

It can be a 🔥, 💥, 👍, ❤️, to add power, or, an adversarial player may use power-ups against an apposing team by sending hashes with negative power associated to them such as 🤮, 😡, 👎, ☭ emoji’s in hex code.

### 4.5 Losing

These are the losing conditions:

Power-based matchups:
At the end of the agreed upon block height, the team with the lower power score loses. A loss will be reflected on this contestants global stats as well as impact their power rating going forward into future matchups.

Count-based matchups:
In a count-based matchup, at the end of the agreed upon Block height, the team with the least amount of votes submitted will have lost. Power is not a factor in the final decision in these types of matchups, although, power-ups associated to the votes submitted do impact the power rating of a participating team.

\*Continued loss within Shawars could have longstanding effects to a players on-chain reputation.

## 5. Art Style

This is a 2D, 8-bit retro themed game with real time data visualizations. The trading pair and character art should resemble that of late 80’s-90’s arcade style fighters.

All of the data streams should be colorful and the game should feel lively with the interactive chat.

## 6. Sounds

If we have music, it should have a retro style, appealing to 8-bit nostalgia but high quality.
t’s important that the sound effects are rewarding as to notify a player each time they’ve successfully submitted an action.
When time is running low, an alert sound can go off each block prior to the match expiring.

## 7. Technical description

Initially the game will be web-based only.

Mobile cross-platform optimization for iOS and Android could come further down the road of development and app progression.

Protocol/Standard could be released in the future for other platforms to create their own version of Sha Wars where the following tools would be necessary:
HummingBird or Mattermost transaction crawler
BitCoin full node
Cloud server such as AWS/Digital Ocean
MinerButton, MoneyButton, and/or Relay One

For project management, use JIRA.

For server-less deployment and testing, use Vercel.

For code submission and collaboration, participate in Agencies.Gitlab.

## 8. Marketing & Funding

Prototype the first level, and then we will outsource job contracts via EarnSV tasks for future development.

Twetch, Bit.sv, and Twitter will be used to market the product, trading pairs, as well as crowdsource original artwork and trading pair submissions.

Create a press kit to send to bitcoin/tech news outlet magazines.

Entertain investment offers after product launch.

### 8.1. Demographics

Age: 22-50
Sex: Male & Female
Technologists, Fincen, and cryptocurrency users

### 8.2. Platforms & Monetization

This is a pay-to-play game leveraging micro-transactions on bitcoin. Submitted votes towards a team costs at present $0.02 per vote.

Anyone in the world can profit from participation by choosing to participate in the “counting” of the votes being submitted through mining.

Mining can be done currently via 21e8 Miner, jsMiner, Master Race Miner v2, or Pow-Pow.

### 8.3. Localization

Initial support will only be in English.

## 9. Other ideas

- Ratings for matchups
- Live stream event plug-in
- Global Leaderboard
- Detailed player stat pages
- Multi-team trading pairs to incorporate 3,4, etc… people in a matchup
- Interactive live streaming transaction feed
