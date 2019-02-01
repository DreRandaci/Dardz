import React from 'react';
import {
  View,
  Image,
  ScrollView } from 'react-native';
import CustomText from '../../components/TextWithAppFont';
import { Bold, BoldItalic, Italic, Br } from '../../components/TextWithAppFont';

export const GameSetupImages = () => (
  <View style={{
    flex: 1
  }}>
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        flex: 0,
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center'
      }}
      maximumZoomScale={5}
    >
      <Image
        style={{
          flex: 1,
          width: 320,
          height: 300
        }}
        source={require('../../assets/Instruction_PNGs/CardLayout2.png')}
        resizeMode='cover'
      />
      <Image
        style={{
          flex: 1,
          width: 300,
          height: 300,
          marginTop: 20,
          marginBottom: 30
        }}
        source={require('../../assets/Instruction_PNGs/GameSetUp2.png')}
        resizeMode='cover'
      />
    </ScrollView>
  </View>
);

export const Instructions = ({ toggleModal }) => (
  <CustomText fontSize={18} color='#000'>
    <Bold fontSize={24} color='#000'>INSTRUCTIONS</Bold>
    <Br />
    <Br />
    Welcome to DARDZ. Dice + Cards. You&#39;ve just entered the fun zone where a bit of luck and a touch of strategy can go a long way. (2-8 players)
    <Br />
    <Br />
    <Bold fontSize={20} color='#000'>OVERVIEW</Bold>
    <Br />
    <Br />
    You win DARDZ by scoring 150 or more points, so the object of the game is to score points while not letting other players score points at the same time. There are 6 ways to score points. A full game consists of multiple rounds. Each round, players race to move 10 cards from their hand to their points pile. Each turn, players get 3 rolls and a possible Bonus Roll. You want to roll the BIG number on the cards in your hand so you can add them to your points pile.
    <Br />
    <Br />

    <Bold fontSize={20} color='#000'>CONTENTS</Bold>
    <Br />
    <Br />
    DARDZ consists of 3 dice and 90 cards. There are 6 of each number 1-12, and 3 of all 6 action cards. Each card has a point value listed at the bottom the card.
    <Br />
    <CustomText
      onPress={() => { toggleModal('imagesFromLink'); }}
      fontSize={18}
      color='blue'
    >
      (See card layout images.)
    </CustomText>
    <Br />
    <Br />

    <Bold fontSize={20} color='#000'>GAME SET UP</Bold>
    <Br />
    <Br />
    Shuffle ALL the cards and deal each player 3 cards, face up. Place the remaining cards face down to create the draw pile. Do this to start each round. Your points pile is kept right next to you, face down.
    <Br />
    <CustomText
      onPress={() => { toggleModal('imagesFromLink'); }}
      fontSize={18}
      color='blue'
    >
      (See game set up image.)
    </CustomText>
    <Br />
    <Br />

    <Bold fontSize={20} color='#000'>HOW TO PLAY</Bold>
    <Br />
    <Br />
    - Before the first round, each player rolls 2 dice and adds them together; the player with the highest score rolls first. If there’s a tie, have a Roll-Off with 1 die.
    <Br />
    <Br />

    <CustomText fontSize={18} color='#000'>EACH TURN:</CustomText>
    <Br />
    <Br />

    1. Play all your action cards right away, even if you draw one in the middle of your turn.
    <Br />
    <Br />
    2. First roll, roll 1 die. There's no choice on the first roll. Any player with this number in their hand adds it to their points pile and draws a
    new card. (If you have multiples of the same number in your hand, add them all to your points pile at the
    same time.)
    <Br />
    <Br />
    3. Second roll, roll 2 dice. The player rolling chooses either single die, the sum of both dice, or picks
    nothing. If you pick a number, any player with this number adds it to their points pile and draws a new
    card.
    <Br />
    <Br />
    4. Third roll, roll 3 dice. The player rolling chooses any single die, the sum of any two dice, or picks
    nothing. You can’t add all three dice together. If you roll 3-of-a-kind you instantly get +20 points! If you
    don’t roll a number in hand, your turn is over. Pass the dice to the left. If you do roll a number in your
    hand, any player with this number adds it to their points pile and draws a new card; then start your Bonus
    Roll.
    <Br />
    <Br />
    5. Bonus Roll, roll 2 dice. Choose either single die or the sum of both dice. Only the player that’s on the
    Bonus Roll can add cards to their points pile! If you don’t roll a number in hand at any point during your
    Bonus Roll your turn is over. If you do roll a number in your hand, add it to your points pile but don’t draw
    a new card. Roll again with 2 dice and try to clean ‘em up, which means adding all 3 cards in your hand to
    your points pile. If you clean ‘em up you instantly get +5 points and your turn is over.
    <Br />
    <Br />

    <CustomText fontSize={18} color='#000'>EACH ROUND:</CustomText>
    <Br />
    <Br />
    1. When any player gets 10 cards in their points pile the round is immediately over. That player has won
    the round and gets +10 points. (Announce when you get 10 cards.)
    <Br />
    <Br />
    2. Each player adds up the point values on the cards in their points pile, not the cards left in their hand. Add
    this number to your score.
    <Br />
    <Br />
    3. Any player ending a round with 3 or less cards in their points pile gets the Lucky Loser roll. Roll 2 dice
    and multiply them together. The Lucky Loser adds this number to their score!
    <Br />
    <Br />
    4. After all the points have been added, a player with 150 or more points wins the game! If nobody wins the
    game, shuffle ALL the cards and deal the next round.
    <Br />
    <Br />
    5. The player with the lowest score rolls first in the next round. If there’s a tie, have a Roll-Off with 1 die.
    <Br />
    <Br />

    <Bold fontSize={20} color='#000'>KEEPING SCORE</Bold>
    <Br />
    <Br />
    - Only 1 person needs to keep score using the free DARDZ app available on the App Store and Google Play, or use paper.
    <Br />
    <Br />

    <CustomText fontSize={18} color='#000'>6 WAYS TO SCORE POINTS:</CustomText>
    <Br />
    <Br />
    1. Add/subtract points for the Jackpot, Boost ‘em, and Bunk ‘em action cards right when they’re played.
    <Br />
    <Br />
    2. Add +20 points right when someone rolls 3-of-a-kind.
    <Br />
    <Br />
    3. Add +5 points right when someone cleans ‘em up on their Bonus Roll.
    <Br />
    <Br />
    4. Add +10 points to the player who wins each round by getting 10 cards in their points pile first.
    <Br />
    <Br />
    5. Add/subtract the point values on the cards in your points pile at the end of each round.
    <Br />
    <Br />
    6. Add points for the Lucky Loser roll for players ending a round with 3 or less cards in their points pile.
    <Br />
    <Br />

    <Bold fontSize={20} color='#000'>STRATEGY</Bold>
    <Br />
    <Br />
    - Don’t let the player who’s winning add cards to their points pile, even if it means not choosing a card in your hand during your turn.
    <Br />
    <Br />
    Any questions should be answered in the Questions &amp; Rules section. Make sure and try Team DARDZ and Drinking DARDZ. The instructions can be found on the app and on the website, DARDZ.com.
  </CustomText>
);

export const QuestionsAndRules = () => (
  <CustomText fontSize={18} color='#000'>
    <Bold fontSize={24} color='#000'>QUESTIONS & RULES</Bold>
    <Br />
    (categories listed alphabetically)
    <Br />
    <Br />
    <CustomText fontSize={20} color='#000'>ACTION CARDS:</CustomText>
    <Br />
    <Br />
    - If you have multiple action cards, choose which one to play first, but
      play them all before going on with your turn.
    <Br />
    - The rolls used for action cards don’t count as one of the rolls for your
      turn.
    <Br />
    - In the first round, the Bunk ‘em and Boost ‘em action cards won’t add
      or subtract points from anyone unless a player has already scored
      points for the Jackpot card or by rolling 3-of-a-kind.
    <Br />
    - The golden 7 is not an action card. It’s just worth more points than a
      regular 7.
    <Br />
    - If you’re in first place and you have a Bunk ‘em card, you have to play
      it and bunk yourself.
    <Br />
    <Br />
    <CustomText fontSize={20} color='#000'>BONUS ROLL:</CustomText>
    <Br />
    <Br />
    - Start the Bonus Roll with 3 cards in your hand.
    <Br />
    - If you drew an action card after your third roll, play it first but still don’t draw a new card. Then continue your bonus roll.
    <Br />
    <Br />

    <CustomText fontSize={20} color='#000'>DRAW PILE:</CustomText>
    <Br />
    <Br />
    - There’s no order to who draws a new card first.
    <Br />
    - If you run out of cards in the draw pile, just keep playing until someone
gets 10 cards in their points pile. If that’s not possible, end the round
and nobody gets the +10 points.
    <Br />
    <Br />

    <CustomText fontSize={20} color='#000'>POINTS PILE:</CustomText>
    <Br />
    <Br />
    - Both number and action cards in your points pile count as 1 or your 10
    cards.
    <Br />
    - You can arrange your points pile so other players don’t know how
    many cards you have, but you can’t hide your points pile.
    <Br />
    - If someone asks how many cards you have in your points pile you
    don’t have to tell them. But you do have to keep your points pile visible.
    <Br />
    - If multiple players get 10 cards in their points pile at the same time,
    they decide who wins the round with a Roll-Off.
    <Br />
    - If a player reaches 10 cards at the same time another player reaches
    11 or 12 cards, the player with the most cards wins the round.
    <Br />
    - If you draw the same number you just added to your points pile, nothing happens.
    <Br />
    - If you get 10 cards in your points pile first but don't announce it, the player who announces it first gets the +10 points.
    <Br />
    <Br />

    <CustomText fontSize={20} color='#000'>ROLLS:</CustomText>
    <Br />
    <Br />
    - On your first roll, if nobody has the number rolled move onto your
second roll.
    <Br />
    - You can only pick 1 number per roll.
    <Br />
    - You’re allowed to pick nothing on your 2nd and 3rd rolls if no option
matches what’s in your hand.
    <Br />
    <Br />

    <CustomText fontSize={20} color='#000'>RULES:</CustomText>
    <Br />
    <Br />
    - You can’t hide the cards in your hand.
    <Br />
    - You’re not allowed to skip a roll or skip your turn.
    <Br />
    - When someone chooses a number that’s in your hand you have to
add it to your points pile.
    <Br />
    - You’re allowed to look at the scoreboard at any time.
    <Br />
    <Br />

    <CustomText fontSize={20} color='#000'>SCORING & WINNING:</CustomText>
    <Br />
    <Br />
    - You can’t go below zero points.
    <Br />
    - You can’t win the game in the middle of a round even if you break 150.
    <Br />
    - If multiple players break 150, the player with the highest score wins
    the game.
    <Br />
    - If multiple players tie with the highest score above 150, decide who
    wins the game with a best-out-of-3 Roll-Off!
    <Br />
    - Make sure you have 3 cards in your hand after your turn is
    finished.-Points in your points pile aren’t added to your score until the
    end of the round.
    <Br />
    -Thepoint value of each number card is roughly based on the probabili-
    ty of rolling that number.
    <Br />
    <Br />

    <CustomText fontSize={20} color='#000'>3-OF-A-KIND:</CustomText>
    <Br />
    <Br />
    - When you roll 3-of-a-kind, those 3 dice still act as your third roll.
  </CustomText>
);

export const TeamDardz = () => (
  <CustomText fontSize={18} color='#000'>
    <Bold fontSize={24} color='#000'>TEAM DARDZ</Bold>
    <Br />
    <Br />
    If you have an even amount of players, pair up in teams of 2. Sit across from your teammate so you aren’t next to each other. All the rules are the same, except for a few small tweaks.
    <Br />
    <Br />
    Each round is a race to get 20 total cards between you and your teammate. It doesn’t matter which teammate has the cards, you just need 20 between the 2 of you. The team who gets 20 cards first wins the round and gets +10 points. Then add both teammates points together.
    <Br />
    <Br />
    Only play action cards in your own hand, not your partner’s hand. As for the <Italic color='#000'>Lucky Loser</Italic>roll, if your team ends with 6 or less total cards between both players, your team gets 1 Lucky Loser roll. Use both players hands during the Bonus Roll. If your team wins a round, choose which player rolls first in the next round.
    <Br />
    <Br />
    If you have an odd amount of players and still want to play teams, the solo person wins a round with 10 cards in their points pile. At the end of a round, double the points in the solo players points pile.
  </CustomText>
);

export const DrinkingDardz = () => (
  <CustomText fontSize={18} color='#000'>
    <Bold fontSize={24} color='#000'>DRINKING DARDZ</Bold>
    <Br />
    <Br />
    <Bold fontSize={20} color='#000'>RECIPE</Bold>
    <Br />
    Make sure and try out our world famous cocktail, <BoldItalic color='#000'>The Dardy</BoldItalic>: 1.5 shots of Bacardi Rum, a splash of strawberry lemonade, a splash of orange juice, a splash of soda water, a dash of grenadine, and garnished with a fresh lemon and lime. Give it a soft shake like you’re getting ready to roll some dice, and then enjoy it like a true playa.
    <Br />
    <Br />

    <Bold fontSize={20} color='#000'>DRINKING RULES</Bold>
    <Br />
    You’ll have to get creative and make up some of your own drinking rules, but here are a few to get you started.
    <Br />
    <Br />
    - When you get <Italic color='#000'>“skunked”</Italic>by missing on all 3 of your rolls, you drink.
    <Br />
    <Br />
    - When you <Italic color='#000'>“clean ‘em up”</Italic>by adding all of your cards to your points pile on the bonus roll, everyone else drinks.
    <Br />
    <Br />
    - When you play the <Italic color='#000'>Clock</Italic>, everyone drinks.
    <Br />
    <Br />
    - When you get a <Italic color='#000'>Skull,</Italic>you drink.
    <Br />
    <Br />
    - When you guess right on the <Italic color='#000'>Jackpot,</Italic>everyone drinks. When you guess wrong on the <Italic color='#000'>Jackpot,</Italic>you drink.
    <Br />
    <Br />
    - When you lose a <Italic color='#000'>Roll-Off,</Italic>you drink.
    <Br />
    <Br />
    - When you get points from <Italic color='#000'>Boost ‘em,</Italic>you drink.
    <Br />
    <Br />
    - When you lose points from <Italic color='#000'>Bunk ‘em,</Italic>you drink.
    <Br />
    <Br />
    - When you rolls Snake Eyes, everyone does a full cheers with eye contact, a nice clank, and then everyone drinks.
    <Br />
    <Br />
    - When you roll and a dice falls off the table, you drink.
    <Br />
    <Br />

    It goes without saying to be safe, and don’t be a dummy…but have fun playing drinking DARDZ!

  </CustomText>
);

// export const Instructions = () => (
//   <View style={{
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: Dimensions.get('window').width,
//     // height: Dimensions.get('window').height
//   }}>
//     <Image
//       style={{
//         width: Dimensions.get('window').width,
//         // height: Dimensions.get('screen').height
//       }}
//       source={require('../Instruction_PNGs/Instructions.png')}
//       resizeMode='cover'
//     />
//   </View>
// );

// export const QuickList = () => (
//   <View style={{
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // width: 100,
//     // height: 500
//   }}>
//     <Image
//       style={{
//         // flex: 1,
//         width: null,
//         height: null
//       }}
//       source={require('../Instruction_PNGs/QuickList.png')}
//     // resizeMode='cover'
//     />
//   </View>
// );

// export const QuestionsAndRules = () => (
  // <View style={{
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // width: Dimensions.get('window').width - 75,
  //   // height: Dimensions.get('window').height
  // }}>
  //   <Image
  //     style={{
  //       width: Dimensions.get('window').width,
  //       height: Dimensions.get('window').height
  //     }}
  //     source={require('../../assets/Instruction_PNGs/Questions&Rules.png')}
  //   />
  // </View>
// );

// export const TeamDardz = () => (
//   <View style={{
//     justifyContent: 'center',
//     alignItems: 'center'
//   }}>
//     <Image
//       style={{
//         width: Dimensions.get('window').width
//       }}
//       source={require('../Instruction_PNGs/TeamDardz.png')}
//     />
//   </View>
// );

// export const DrinkingDardz = () => (
//   <View style={{
//     justifyContent: 'center',
//     alignItems: 'center',
//   }}>
//     <Image
//       style={{
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height
//       }}
//       source={require('../Instruction_PNGs/DrinkingDardz.png')}
//       resizeMode='contain'
//     />
//   </View>
// );

// export const Instructions = () => (
//   <CustomText fontSize={18}>
//     <Bold fontSize={24}>DARDZ</Bold>
//     can be played with 2-8 players. After reading these instructions, go to <Bold>YouTube</Bold>
//     and search,
//     {' '}
//     <Italic>How to play DARDZ.</Italic>
//     I made a short video that will help you learn how to play. Also, use the
//     {' '}
//     <Italic>Quick List</Italic>to help you get through your first couple rounds.
//     <Br />
//     <Br />
//     Make sure and try
//     {' '}
//     <Bold>Team DARDZ</Bold>
//     because it’s arguably even more fun than playing solo.
//     <Br />
//     <Br />
//     <Bold fontSize={24}>HOW TO WIN</Bold>
//     <Br />
//     <Br />
//     At the end of a round, the player with the highest score above 150 wins the game.
//     <Br />
//     <Br />
//     <Bold fontSize={24}>HOW TO SCORE POINTS</Bold>
//     <Br />
//     <Br />
//     Only 1 person needs to keep score, preferably using the free DARDZ app. There are 5 ways to score points. The first 2 happen in the middle of a round, the last 3 happen at the end of a round.
//     <Br />
//     <Br />
//     1: Scoring points for the Jackpot, Boost ‘em, and Bunk ‘em action cards (+/- various).
//     <Br />
//     <Br />
//     2: Rolling 3-of-a-kind (+20).
//     <Br />
//     <Br />
//     3: Win a round by being the first to get 10 cards in your points pile – that includes number cards <Italic>and</Italic>action cards. (+10).
//     <Br />
//     <Br />
//     4: Add up the points in your points pile (+/- various).
//     <Br />
//     <Br />
//     5: Add points for the Lucky Loser roll (+ various).
//     <Br />
//     <Br />
//     <Bold fontSize={24}>HOW TO PLAY</Bold>
//     <Br />
//     <Br />
//     Each round is a race to get 10 cards in your points pile (which you’ll keep right next to you). You add cards to your points pile by playing action cards and by rolling the BIG number on the cards in your hand. The small number at the bottom of each card is the point value of the card. When you add a card to your points pile,
//     {' '}
//     <Bold fontSize={20}>
//       any other player who has that number also adds that card to their points pile
//     </Bold>
//     (except on your Bonus Roll). If you have multiples of the same number, add them all at the same time. Draw a new card any time you add a card to your points pile (except on your Bonus Roll).
//     <Br />
//     <Br />
//     <Bold fontSize={24}>ORDER OF PLAY</Bold>
//     <Br />
//     <Br />
//     1. It doesn’t matter who deals, but shuffle the deck and deal each player 3 cards face up. Place the remaining cards face down. To see who rolls first, each player rolls 2 dice and adds them together. The highest score goes first. If there’s a tie, have a Roll-Off where you each roll 1 die.
//     <Br />
//     <Br />
//     2. When it’s your turn, ALWAYS PLAY ACTION CARDS FIRST, even if you draw one in the middle of your turn (including during your Bonus Roll). If you have multiple action cards, choose which one to play first. If you don’t have any action cards, start your 3 rolls. (Rolls used for action cards <Bold fontSize={20}>don’t</Bold>count as one of your 3 rolls.)
//     <Br />
//     <Br />
//     3. First roll: Roll 1 die. There’s no choice on the first roll. Any player who has that number adds it to their points pile.
//     <Br />
//     <Br />
//     4. Second roll: Roll 2 dice. Choose either single die or the sum of both dice. You can also pick nothing. On your 2nd and 3rd rolls, say out loud which number you choose.
//     <Br />
//     <Br />
//     5. Third roll: Roll 3 dice. Choose any single die or the sum of any 2 dice. You can also pick nothing, but you <Bold fontSize={20}>can’t</Bold>add all 3 dice together. If you miss, your turn is over. Pass the dice to the player on your left. If you get something on your 3rd roll, you enter the Bonus Roll.
//     <Br />
//     <Br />
//     6. Start the Bonus Roll with 3 cards in your hand. Roll 2 dice. Choose either single die or the sum of both dice. If you miss, your turn is over. If you get something, add it to your points pile but <Bold fontSize={20}>don’t</Bold>draw a new card, even if you played an action card. ONLY THE PLAYER THAT’S ON THE BONUS ROLL CAN ADD CARDS TO THEIR POINTS PILE! Keep rolling with 2 dice and try to <Italic>clean ‘em up,</Italic>which means adding all the cards in your hand to your points pile. If you <Italic>clean ‘em up,</Italic>your turn is over.
//     <Br />
//     <Br />
//     7. The first player to get 10 cards in their points pile wins the round and gets +10 points. Then, each player adds up the points on the cards in their points pile. Discard the cards left in your hand.
//     <Br />
//     <Br />
//     8. At the end of a round, any player with 3 or less cards in their points pile gets the Lucky Loser roll. <Bold fontSize={20}>Roll 2 dice and multiply them together.</Bold>The Lucky Loser adds this number to their score.
//     <Br />
//     <Br />
//     9. At the end of a round, the player with the highest score above 150 wins the game. If nobody wins, shuffle the deck, deal the cards, and start the next round. The player who won the previous round rolls first in the next round.
//     <Br />
//     <Br />
//     If you’re playing with less people and the games are going quickly, try playing to 200 points. On the other hand, if they’re taking too long, play to 100 points. Hell, play to whatever you want!
//     <Br />
//     <Br />
//     <Bold fontSize={24}>CONTENTS</Bold>
//     <Br />
//     <Br />
//     DARDZ consists of 3 dice and 90 cards. There are 6 of each number 1-12, and 3 of all 6 action cards.
//   </CustomText>
// );

// export const QuickList = () => (
//   <CustomText fontSize={18}>
//     <Bold fontSize={24}>QUICK LIST</Bold>
//     <Br />
//     <Br />
//     - Each round is a race to get 10 cards in your points pile, including action cards and number cards. The winner of each round gets + 10 points.
//     <Br />
//     <Br />
//     - Add cards to your points pile by playing action cards and by rolling the numbers in your hand.
//     <Br />
//     <Br />
//     - When it’s your turn, always play action cards first.
//     <Br />
//     <Br />
//     - Rolls used for action cards don’t count as 1 of your 3 rolls.
//     <Br />
//     <Br />
//     - Score points for the Jackpot, Boost ‘em, and Bunk ‘em action cards right when they’re played.
//     <Br />
//     <Br />
//     - Add + 20 points to any player that rolls 3 - of - a - kind.
//     <Br />
//     <Br />
//     - Roll 1 die for your first roll, 2 for your second, and 3 for your third.
//     <Br />
//     <Br />
//     - No choice on the 1st roll.Any player with that number adds it to their points pile.
//     <Br />
//     <Br />
//     - On your 2nd and 3rd roll pick any 1 die, the sum of any 2 dice, or pick nothing.You can’t add all 3 dice together.Say which number you pick out loud.
//     <Br />
//     <Br />
//     - Every player that has that number adds it to their points pile(except on your bonus roll).
//     <Br />
//     <Br />
//     - If you get something on your 3rd roll, start your bonus roll.Only the player that’s on the bonus roll can add cards to their points pile.
//     <Br />
//     <Br />
//     - Start the bonus roll with 3 cards in your hand, but don’t draw new cards during the bonus roll.Try to clean ‘em up by adding all your cards to your points pile.
//     <Br />
//     <Br />
//     - Lucky Loser roll for players ending a round with 3 or less cards in points pile.Roll 2 dice and multiply them together.Add this number to your score.
//     <Br />
//     <Br />
//     - A the end of each round, add up the points in your points pile, not the cards left in your hand.
//     <Br />
//     <Br />
//     - The player with the most points above 150 at the end of a round wins the game.You can’t win in the middle of a round.
//   </CustomText>
// );

// export const QuestionsAndRules = () => (
//   <CustomText fontSize={18}>
//     <Bold fontSize={24}>QUESTIONS & RULES</Bold>
//     <Br />
//     <Br />
//     - You can only use 1 number per roll.
//     <Br />
//     <Br />
//     - Zero is the lowest score. You can’t go below zero points.
//     <Br />
//     <Br />
//     - The golden #7 is not an action card.
//     <Br />
//     <Br />
//     - All action cards and number cards count as 1 of the 10 cards in your points pile.
//     <Br />
//     <Br />
//     - If multiple players get 10 cards in their points pile at the same time, they decide who wins the round with a Roll-Off. If a player reaches 10 cards at the same time another player reaches 11 or 12 cards, the player with the most cards wins the round.
//     <Br />
//     <Br />
//     - You can only win the game at the end of a round, even if someone breaks 150 points in the middle of a round.
//     <Br />
//     <Br />
//     - If multiple players tie with the highest score above 150, decide who wins the game with a best-out-of-3 Roll-Off.
//     <Br />
//     <Br />
//     - If you run out of cards in the draw pile, just keep playing until someone gets 10 cards in their points pile. If that’s not possible, end the round and nobody gets the +10 points.
//     <Br />
//     <Br />
//     - You’re not allowed to skip a roll or skip your turn.
//     <Br />
//     <Br />
//     - When someone chooses a number that’s in your hand, you <Bold fontSize={20}>have</Bold>to add it to your points pile.
//     <Br />
//     <Br />
//     - You <Bold fontSize={20}>can’t</Bold>hide the cards in your hand.
//     <Br />
//     <Br />
//     - If someone asks how many cards you have in your points pile you <Bold fontSize={20}>don’t</Bold>have to tell them. But you <Bold fontSize={20}>do</Bold>have to keep your points pile visible.
//     <Br />
//     <Br />
//     - You’re allowed to look at the scoreboard at any time.
//   </CustomText>
// );