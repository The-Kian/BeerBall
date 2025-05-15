import Gallery from '@/app/components/Gallery';
import React from 'react';

const RulesPage: React.FC = () => {

    return (
        <div>
        <div>
        <h1 className="text-4xl mb-4 space-y-8 space-x-8">Rules</h1>
        <h2 className="text-2xl">BeerBall Rules 2024</h2>
        </div>
        <Gallery/>

        <h3 className="text-xl font-bold">Setup and First Throw:</h3>
        <p>Two teams play against each other. Each team has a can placed on their side of a table.</p>
        <p>The game begins with a coin toss to decide which team throws first.</p>

        <h3 className="text-xl font-bold">Throwing the Ball:</h3>
        <p>Players take turns throwing a ball at the opposing team&apos;s cans from behind their side of the table.</p>
        <p>Your elbow must stay behind the edge of the table during throws.</p>

        <h3 className="text-xl font-bold">Drinking Rules:</h3>
        <p>You may only start drinking if your throw hits an opponent&apos;s can (this is considered a successful throw).</p>
        <p>Drinking stops immediately when the opposing team retrieves the ball, places it on the table, and calls out “stop.”</p>

        <h3 className="text-xl font-bold">Catching the Ball:</h3>
        <p>If an opponent catches the ball after you&apos;ve hit their can, you cannot drink. Instead, the catcher has the opportunity to drink.</p>
        <p>The catcher can also run until tagged by someone from the opposing team. If tagged, the drinking stops.</p>
        <p>A catch counts if it pings of the tinny and is caught before it hits the floor or table. If the ball hits a teammate before it is caught, it still counts as a catch </p>
        <p>Don&apos;t run outside the park.</p>

        <h3 className="text-xl font-bold">Interference:</h3>
        <p>You are not allowed to block an opponent from retrieving the ball.</p>
        <p>However, if your teammate catches the ball, you are allowed to block opponents to prevent them from tagging the catcher. No physical wrestling or tackling is allowed.</p>

        <h3 className="text-xl font-bold">Winning the Game:</h3>
        <p>The first team to finish drinking both of their cans wins.</p>
        <p>When you finish a can, you must hold it above your head to show it is empty.</p>
        <p>If a can is not empty, it is returned to play, and the referee will decide when you can attempt to finish drinking it again.</p>

        <h3 className="text-xl font-bold">Scoring and Progression:</h3>
    <p>Players earn points based on the order they finish their drinks, scoring 3, 2, 1, or 0 points.</p>
    <p>These points, known as the drink point average, are used for seeding in tournaments and for other matchup decisions.</p>


    <h3 className="text-xl font-bold">Can Placement:</h3>
    <p>Cans must be placed within a thumb&apos;s length from both edges of the table.</p>
    <p>If only one can remains for a team, it should be moved to the centre of the table, still within a thumb&apos;s length of the edge.</p>
    <p>Cans must start upside down and unopened.</p>


    <h3 className="text-xl font-bold">Player Equipment:</h3>
    <p>Each player must use a regulation sized tinny of at least 440ml.</p>


    <h3 className="text-xl font-bold">Fouls and Penalties:</h3>
    <p>Actions like tackling, illegal blocking, or drinking at incorrect times will result in penalties.</p>
    <p>Penalties can include free drinks for the opposing team or, in severe cases, carding by the referee.</p>
    <p>Spillage is lickage.</p>


    <h3 className="text-xl font-bold">Referee and Disputes:</h3>
    <p>The referee&apos;s decision is final. Each team can challenge one referee decision per game by performing a traditional dance, known as “judge time.”</p>
    <p>Successful challenges can overturn a bad call.</p>

    <h3 className="text-xl font-bold">Cheating:</h3>
    <p>Cheating is not allowed and includes false accusations. If caught, penalties depend on the severity and frequency of cheating, ranging from extra drinks for the opposing team to a booking.</p>
    <p>Cheating not caught during gameplay goes unpunished.</p>


    <h3 className="text-xl font-bold">Booking System:</h3>
    <p>Players receive an official warning before a yellow card is issued.</p>
    <p>Two yellow cards equal a red card, leading to disqualification. However, the team can continue with a replacement player.</p>
    <p>Judge times can contest bookings.</p>

    <h3 className="text-xl font-bold">Behaviour:</h3>
    <p>It’s in a public park so no behaviour!</p>
    <p>No wrestling without consent, and do it far away from the group.</p>
    <p>Chun in a bucket or go to our house to chun in the toilet (not the sink).</p>
    <p>Don’t be too loud, Don’t be a dick. Be mindful of the park users around us.</p>


    <b>Prizes:</b>
    <p>Winners receive the Community Shield, engraved with their team name and date, which they keep until the next tournament.</p>
    <p>Gold trophies are awarded to both players of the winning team.</p>
    <p>Second and third place teams receive medals.</p>
    <p>Special awards include a golden tinny for the best player and a brown tinny for the player with the lowest score.</p>

        </div >
    );
};

export default RulesPage;
