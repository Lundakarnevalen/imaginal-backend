'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'AdministerIT',
      nameEn: 'AdministerIT',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'AdministerIT bringar ordning och reda i den karnevalistiska yran! Som karnevalist i AIT stöttar du andra sektioner genom att bistå med information, hålla pli på karnevalens lånebilar och se till att karnevalister är rätt registrerade. Vi är de som bygger den digitala karnevalvärldens medel i form av appar, hemsidor och annat som kan behövas. Lär dig koda och gör Lundakarnevalen än mer cybertastic!',
      textEn: 'AdministerIT works behind the scenes: Join AIT and become every section’s hero by supporting your fellow karnevalists with information, digital systems and registration. With the creation of our apps and websites we’ve built Lundakarnevalen’s digital playground. Learn to code and make Lundakarnevalen even more cybertastic!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Kommunikationssektionen',
      nameEn: 'The Communication Section',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Vi får intern, extern och digital kommunikation att funka. Vi håller alla uppdaterade kring gårdagens händelser och senaste nytt. Vem vet vad morgondagen bringar? Vi vet. Du gör inte - än. Sök till oss, lös problem innan de uppstår och sprid ordet om det mest imaginala 2018: Lundakarnevalen!',
      textEn: 'We make internal, external and digital communication work. We see to it that everyone involved is kept up to date with recent events and the latest news. Who knows what tomorrow will bring? We do. You don’t - yet. Join us, solve problems before they even exist and help spread the word about the most imaginal event of 2018: Lundakarnevalen!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Mediahuset',
      nameEn: 'Mediahuset / The Media House',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Mediahuset är en skön mix av radio, klipperi och foto! Radion sänder under våren och sen från en glasbur musikhjälpen-style under karnevalsdagarna. Klipperiet kommer att göra Lundakarnevalen ännu lite bättre med hjälp av rörlig bild (allt från reklamfilm till knasiga karnevalsklipp). Foto kommer att ansvara för att föreviga den magiska karnevalskänslan under våren. Låter detta amazeballs? Sök oss!',
      textEn: 'Mediahuset is a great mix of radio, film and photo! The radio team will broadcast during spring and then 24/7 during the carnival days from a glass cage. The film team will make Lundakarnevalen move, doing everything from commercials to creative carnival clips. The photo team will be responsible for catching that magic carnival feeling. Does this sound amazeballs? Join Mediahuset!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog - Den stegrande enhörningen',
      nameEn: 'Pub - The rearing unicorn',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'En kulinarisk upplevelse med karnevalistisk twist, guidad av en galopperande enhörning - det är ledorden för Krog Den Stegrande Enhörningen! Brinner du för att laga mat? Vill du skapa glädje bakom baren? Eller drömmer du i hemlighet om uppfyllda brandsäkerhetsföreskrifter? Skapa krogen där fantasi och verklighet blandas till en upplevelse att minnas!',
      textEn: 'An experience serving food and drinks with a twist and a unicorn guiding the way. Happiness and creativity are the characteristics of our tent, where magic happens. Do you have a passion for cooking? Do you want to spread joy behind the bar? Or do you get fired up thinking about fire safety? Create a restaurant where imagination meets reality in an event worth remembering.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Foodtrucks',
      nameEn: 'Foodtrucks',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Välkommen till Krog Foodtrucks, en av Lundakarnevalens splitternya sektioner! Hos oss får du möjlighet att göra något helt unikt och sätta prägel på Lundakarnevalen. Här ser vi till att Lundakarnevalens besökare får magarna fulla av god, fräsch streetfood i karnevalistisk tappning. Här har du möjlighet att laga mat, snacka strunt med Lundakarnevalens besökare, kränga öl eller ordna fester i vårt kalaskula vieri!',
      textEn: 'Welcome to the Foodtrucks, a brand new section in Lundakarnevalen! Together we’ll create something unique and make our mark on Lundakarnevalen. We’re the ones that make sure hungry visitors get their bellies filled with delicious street food with a karnevalistic twist. Join us if you want the opportunity to cook, chat with our customers, sell beer or arrange parties for our karnevalists!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Säkerhetssektionen',
      nameEn: 'The Safety Section / The Security Section?',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Säkerhetssektionen ser till att alla karnevalister och besökare är och känner sig säkra och trygga under hela karnevalsvåren! Som säkerhetskarnevalist får du chansen att se Lundakarnevalens alla hörn - vad sägs om att ingå i mobila problemslösarteam, bli proffs på att prata radio, brandvakta publiktäta event, hänga i AF-Borgen eller anordna hyss i vårt egna vieri? Imaginala möjligheter!',
      textEn: 'The safety section ensures that all the Karnevalists and visitors of Lundakarnevalen are safe and happy. As a Karnevalist in the security section you get the chance to see every corner of Lundakarnevalen, as we’re always ready to solve problems as they emerge. Whether we’re fixing a broken fence, working with fire prevention or solving a conflict - be sure to be accompanied by this friendly bunch!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Showen',
      nameEn: 'Showen',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Vill du tillsammans med nästan 100 andra Showerister skapa en karnevalsmusikal?\n' +
      'Showen är en föreställning, med en trerätters middag som kommer att hålla till i Tegnérs Matsalar i AF-borgen. Tillsammans kommer vi ta med tonvis med karnevalsbesökare på en resa genom det undermedvetna i en föreställning de sällan kommer att glömma!\n',
      textEn: 'Do you want to join about 100 other students and create a musical for Lundakarnevalen? Showen is a musical show with a three course dinner, that will play in Tegnérs Matsalar in AF-borgen. Together we will let thousands of visitors join us on a journey through the subconscious in a show they will never forget!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Vagnsektionen',
      nameEn: 'The floats section',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Vagnsektionen är en av tre sektioner som tillsammans utgör Lundakarnevalens hjärta, Karnevalståget! Vi ansvarar för innehållet i tåget. Hos oss kan du vara med och utveckla konceptet och bygga vagnar och mellanekipage eller vara värd för våra gästande orkestrar. Under karnevalshelgen kommer sedan din glädje och finurliga humor visas upp för tågets hundratusentals åskådare.',
      textEn: 'The carnival floats section is one of three sections in the carnival parade. Here you’ll develop the concept (Mars-April) and build (April-May) the carriages or be a host for the marching bands that are visiting Lundakarnevalen. During the carnival your happiness and clever humour will be displayed for the hundreds of thousands of spectators of the parade.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Snaxeriet',
      nameEn: 'Snaxeriet',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Snaxeriet är Lundakarnevalens bränsledepå som säljer bland annat snax, kaffe och korv till alla karnevalsbesökare. Som karnevalist i Snaxeriet kan du få göra allt från att bada i popcorn och koka kaffe till att bygga imaginala försäljningsbodar, gå i tåget och ordna snaxiga fester. Garanterat fritt från nyttigheter och laddat med karnevalistiska dumheter!',
      textEn: 'Snaxeriet is the fuel depot of Lundakarnevalen and offers snacks, coffee and hot dogs e.g. to all of its visitors. As a Karnevalist in Snaxeriet, you will be able to do stuff ranging from swimming in a sea of popcorn and brewing coffee, to building stalls, being part of the parade and arranging snaxy parties. Guaranteed to be free from healthy food and brimming with karnevalistic mischief!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Filmen',
      nameEn: 'The movie ',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'I Filmen får du chansen att medverka i en filmproduktion! Med kärlek och imaginalitet skapar vi en 45 minuter lång film med urpremiär tidigt på karnevalsvåren. Filmen är ett av de stora nöjena och går på repeat under karnevalsdagarna. Hos oss kan du engagera dig i allt möjligt, från filmklippning till vieri. Inga förkunskaper krävs!',
      textEn: 'With us, you get to be a part of a film production where we produce a 45 minute long film – created with lots of love and creativity! Before Lundakarneval takes place we arrange a film premiere where we show the world the movie for the first time and celebrate. You can do a lot of different things with us, everything from film editing to organising parties, no previous experience needed!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Revyn',
      nameEn: 'Revyn',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Revyn är ett av Lundakarnevalens stora nöjen! Vi sätter upp en sketchbaserad imaginal föreställning. Som karnevalist i Revyn är det full rulle från från 13:e april till dess att Lundakarnevalens sista dag övergår till vanlig måndag. Hos oss kan du snickra, måla, sminka, sy, laga mat, planera fest, stå på scen, spela i band, fixa teknik - och framför allt nå toppen av karnevalistiskt trams!',
      textEn: 'Revyn is one of the big shows of Lundakarnevalen. We will do a sketch based imaginal show. Our working period is from the 13th of April until the end of the Karneval. Here you can build sets, paint, do make up, sew, cook, plan parties, perform on stage, play in the band, be in charge of light and sound, and above all be at the height of the academic silliness of Lund.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Cirkusen',
      nameEn: 'The Circus',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Vi är Lundakarnevalens äldsta nöje och vi sätter upp en cirkusföreställning under karnevalsdagarna. Vår arbetsperiod kommer starta fem veckor innan karnevalen. Då ses vi söndag till fredag varje vecka och repar, bygger, syr och göttar! En unik chans att vara med och skapa en cirkus och få vänner för livet under din studietid!',
      textEn: 'We are Lundakarnevalens oldest amusement and we will create a wicked circus show during the carnival days. Our working period will start five weeks before the carnival. We’ll rehearse Sunday through Friday, and build, sew, cook and much more. A unique chance to be a part of creating a circus and make friends for life during your time at Lund University.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Blädderiet',
      nameEn: 'Flickery',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Gillar du lukten av papper? Är skrivande din grej? Du kanske är en mästare på att sälja? Bli en del av Blädderiet: vi skapar och säljar karnevalsbladet, barnboken, programbladet och mycket, mycket mer! Vi söker inspirerande personer som har ett öga för grafisk design, en stor foto- eller skrivarglädje eller en superspexig personlighet. Bli del av Blädderiet – bli en del av karnevalshistorien.',
      textEn: 'Do you like the smell of paper? Have any writing skills? Are you the master of sales? Become part of Blädderiet and help create and sell Lundakarnevalen’s magazine, children’s book, programme and much more! We need inspiring people with an eye for graphic design, a love for writing or photography, or just a fun personality! Join Blädderiet and become part of carnival history.\n',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Tältnöjessektionen',
      nameEn: 'The Tentertainment Section',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Tältnöjessektionen sprider glädje genom 20 tält på karnevalsområdet. Här ryms allt från rullskridskodisko till matematiktävlingar och mycket mer. Med finess och humor planerar och arrangerar varje tältgrupp på 25 karnevalister varje tält så att besökarens upplevelse sent ska glömmas! Välkommen till oss och var med och bygg tälten som folk pratar om i många år framöver.',
      textEn: 'The Tentertainment section spreads joy with our 20 tents in Lundagård. Here everything from rollerblade disco to math competitions will take place. With finesse and humor, each tent team plans and arranges their tent so that the visitors get an experience they won’t soon forget. Join us in building the tents that will be talked about for many years to come.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Lundagård',
      nameEn: 'Lundagård',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Sektionen Lundagård förvandlar vårt vardagliga Lundagård till en helt imaginal, karnevalistisk drömvärld! Med färg och ljus tar vi med besökarna till en plats de bara kunnat drömma om. Förutom att pimpa Lundagård är vi också den sektion som sköter områdets planering och logistik - allt från kartor och tält till renhållning och elförsörjning!',
      textEn: 'Lundagård will be transformed from an ordinary park into an imaginal dream world! With colour and lights we’ll create an atmosphere that visitors have only dreamt about. We’re also responsible for the logistics of the Lundakarneval area - we take care of everything from maps and tents to entrances and electricity.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Operan',
      nameEn: 'The Opera',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Operan, ett nytt stornöje som Lundakarnevalen aldrig tidigare skådat, där musik och sång står i fokus under föreställningen. Men det är inte bara musik och sång som behövs för en imaginal föreställning utan även dekor, teknik, kläder, smink, mat och mycket mer, med en härlig gemenskap. Gå med i Operan och skapa karnevalistisk historia!',
      textEn: 'For the first time ever, Lundakarnevalen gives you: the Opera. A show filled with music and signing!  But, of course, that’s not all of it. For a show, as imaginal as possible, we design all of the props ourselves, all the while building a great sense of community. Join the Opera and make history in Lundakarnevalen!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Fabriken',
      nameEn: 'The Factory',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Fabriken är en av tre sektioner som tillsammans utgör Lundakarnevalens hjärta, Karnevalståget. I Fabriken får du vara med och bokstavligen bygga och sy ihop den mest imaginala av Lundakarnevaler. På fabriksområdet bygger, syr och fixar vi tillsammans med andra sektioner till hela Lundakarnevalen. Vill du kunna peka på något och säga ”Det där, det har jag gjort”, då är Fabriken något för dig!',
      textEn: 'Fabriken is one of three sections that together constitutes the heart of the carnival, the carnival parade. In Fabriken, you will literally build and sew up the most imaginal of carnivals. Fabriken creates things used in the entire carnival at our factory space. If you like pointing at something and say ”I created that”, then Fabriken is the right place for you!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Ekonomisektionen',
      nameEn: 'The Economy Section',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Ekonomisektionen är Lundakarnevalens egen centralbank! Vår uppgift är att hålla koll på stålarna, där bidrag, bokföring, betallösningar och kontantsäkerhet är några av våra specialområden. Som stöd till de andra sektionerna möjliggör vi allt karnevalistiskt skoj och trams som är Lundakarnevalen. Häng med oss och se till att göra alla karnevalsvårens imaginaliteter till verklighet!',
      textEn: 'The financial section is the central bank of Lundakarnevalen. Our task is to keep track of the money, where grants, bookkeeping, payment solutions and cash safety are some of our areas of expertise. To support other sections we enable all the spoofs and jinks that make up Lundakarnevalen. Join us and help realise the imaginalities the spring will bring!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krögeriet',
      nameEn: 'Krögeriet',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Wehej och välkommen till Krögeriet! Vi ser till att våra karnevalister varken går hungriga eller törstiga  magar är mätta och törstar släckta under Lundakarnevalen. Vi har hand om all dryck - karnevöl, karnevatten, karneyounameit - som ska förtäras under Lundakarnevalen.. Dessutom ser vi till att VIP och karnevalsvänner har det bra. Häng med oss och se till att alla får fantastiska karnevalistiska dagar i maj!',
      textEn: 'Welcome to Krögeriet! It’s our job to make sure that everyone working at Lundakarnevalen have somewhere to eat and relax. We also work behind the scenes with all liquids that will be consumed during Lundakarnevalen. In Krögeriet we have everything from a gourmetresturang to security work and warehousing. Join us in Krögeriet and have your best experience in Lund.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Spexet',
      nameEn: 'The Spex',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Som Lundastudent får du INTE missa vare sig spex eller Lundakarneval. Slå ihop de tu och du får ett av Lundakarnevalens Stora Nöjen! Spexet växer fram under en månads reptid med götte och kulminerar i tre intensiva karnevalsdagar med föreställningar! Vi ska fylla Stora Salen i AF-borgen, vilket innebär att mängder med människor få se vad just DU har varit med och skapat!',
      textEn: 'Both spex and Lundakarnevalen are traditions that one must have been a part of during their studies in Lund, kill two birds with one stone by joining Spexet! During a month of rehearsals with lots of fun and three intense carnival days, you’ll be creating history in Lund! We’ll fill Stora Salen to the brim, lots of people will see what YOU have been a part of and created!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Stationen',
      nameEn: 'The Station',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Stationen är en av tre sektioner som tillsammans utgör Lundakarnevalens hjärta, Karnevalståget! Vi ser till att Tåget rullar som det ska, att det finns ett episkt tågområde där alla vagnar byggs och att peppen alltid är på topp. Gillar att planera events, laga mat, bygga eller sminka karnevalister så är Stationen något för dig. Vi lovar massa glädje och kreativitet oavsett arbetsuppgift!',
      textEn: 'Stationen is one of the three sections in the Carnival train. We ensure that the train runs smooth during the Carnival, that there’s an epic train area where all the carnival floats are built and keep the hype and energy high within the parade sections. Whether you like to plan events, cook, build or do makeup, join Stationen! We can promise lots of joy and creativity regardless of the task!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Dansen',
      nameEn: 'The Dance',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Vill du vara med och anordna Sveriges största klubb? Dansen söker glada personer som vill syssla med allt från servering, till musik, mat, scenbygge, ekonomi och allt annat som behövs för en bra fest! Under våren trummar vi tillsammans fram rytmen för festligheterna, för att sedan förverkliga allas drömmar i AF-Borgen under karnevalsdagarnas nätter.',
      textEn: 'Would you like to be involved in the biggest club in Sweden? Dansen is looking for people who want to contribute to making exceptional parties; help with serving beverages and food, stage building, music and everything else is needed to create a party! This spring we will plan the festivities together, so that the party in AF Borgen during Lundakarnevalen will be something to remember.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: '',
      nameEn: '',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: '',
      textEn: '',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Barnevalen',
      nameEn: 'Barnevalen',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Barnevalens karnevalsområde är till för... gissa vilka? Alla barn! Vi ska skapa en föreställning som passar både stora och små samt hålla i ett café och några barnsligt roliga upplevelser i form av tältnöjen. Vår främsta arbetsperiod är månaden innan Lundakarnevalen. Då kommer vi ses och ha det gött tillsammans, men såklart också jobba och förbereda oss inför den bästa Barnevalen någonsin!',
      textEn: 'Barnevalen is an area for all the children visiting Lundakarnevalen! We’ll perform a show that suits both children and their parents. We’ll also run a café and a number of childish fun experiences in tents. We’ll be the most active the month before Lundakarnevalen. During this time we’ll hang out, have fun as well as work together to create the best Barneval ever!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Kabarén',
      nameEn: 'Kabarén',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Vi är ett av de Stora Nöjena som håller till i Lundagård och har föreställningar i ett stort tält! Som kabarékarnevalist kommer du att ha det ganska lugnt fram till början av april, då vi kavlar upp ärmarna ordentligt och ses fyra till sex gånger i veckan fram till karnevalen. Vi gör allt från att bygga dekor, laga mat, sy kläder, sminka, stå på scen, hitta på trams och mycket mer!',
      textEn: 'We are one of the shows located outside in Lundagård and are performing in a big tent! As a Kabaré-Karnivalist, our work will start in the beginning of april when it\'s time to roll up our sleeves and get cranking four to six times a week until Lundakarnevalen begins. We do everything from building props, cooking, sewing costumes, do makeup, various mischief and much more!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Drömmerian',
      nameEn: 'The Dreamery',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Drömmerian är den sektion som skapar och säljer det som lever kvar efter Lundakarnevalen 2018: Alla karnevalistiska prylar. KUL! Hos oss kan du göra allt från att kränga merch, styra fester eller skapa en helt egen pryl! Vi börjar på riktigt i slutet på mars då alla produkter anländer och för-försäljningen börjar. Därefter ska butikerna ordnas och 30 000 produkter säljas!',
      textEn: 'Drömmerian is the section that creates and sells what remains after Lundakarnevalen, all the carnivalistic merch. WOW! With us, you can do anything from working in the shop, arranging parties, or creating your own merch! The work truly begins in the end of March when all products arrive and the sale begins. After that, the shops will be organized and 30,000 products will be sold!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Vieriet',
      nameEn: 'Vieriet',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Är du en glädjespridare av rang som kan kombinera nytta med trams? Vieriet skapar vi-känsla och gemenskap i hela Lundakarnevalen genom att arrangera stora som små interna evenemang och aktiviteter för alla karnevalister! Som Vierist får du göra nytta på flera olika sätt - den allra viktigaste är att sprida en härlig stämning och gó karnevalistisk glädje i hela karnevalen!',
      textEn: 'Vieriet strives to create a feeling of community within all of Lundakarnevalen. We arrange small and large events and activities for all the other karnevalists! Are you a ray of sunshine who enjoys antics and tomfoolery? The tasks vary from person to person - the most important one is the ability to spread happiness and karnevalistisk joy!\n',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Biljonsen',
      nameEn: 'Biljonsen',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Biljonsen, en förkortning av Biljett- och sponssektionen, är Lundakarnevalens monetära flytväst. Genom att sälja biljetter och att ha goda relationer med Karnevalsvänner ser vi till att det blir en Lundakarneval vart fjärde år. Vi letar efter glada biljettsäljare, vierister och de som vill syssla med ekonomi. Vill du ha Lundakarnevalen på en stadig grund? Kolla in Biljonsen!',
      textEn: 'Biljonsen is responsible for all of Lundakarnevalen’s revenues. We sell all the tickets for the main shows and handle the relationships with our partners and sponsors. For the english speaking students we are mainly looking for people who want to work in the Vier, which means to create a feeling of community and make sure that the spring of 2018 will make the best memories! ',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog Athen',
      nameEn: 'Pub Athen',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Vill du vara med i en uppslukande krogupplevelse? Sök då till Krog Athen (name pendning). Här kommer vi bjuda på en annorlunda upplevelse med mat, dryck och umgänge! Vi ska tillsammans mätta alla besökares magar, släcka deras törst, och tillfredställa deras behov på ett imaginalt vis. Vi söker dig som vill jobba med mat, dryck, underhållning och organisation i ett enda stort, imaginalt hopkok.',
      textEn: 'Do you want to be part of an immersive pub experience? Then join Pub Athens (name pending). We will offer a divergent experience with food, beverages, and much more. Together we will still people\'s hunger, quench their thirst, and satisfy all of their needs in an imaginal fashion. We\'re looking for those who want to work with food, beverage, entertainment, and organisation in one big, imaginal concoction.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Musiksektionen',
      nameEn: 'The Music Section',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Det är vi som tar hand om alla artister som gästar Lundakarnevalen och ser till att de har det bra. Dessutom bygger vi scener och sköter all annan underhållning på Stora Scenen i Lundagård. Om du älskar musik och tycker att häng i backstageområdet under Lundakarnevalen låter lockande är Musiksektionen rätt val för dig! Välkommen!',
      textEn: 'We are the Music section! We take care of all the artists that play at Lundakarnevalen and make sure they are comfortable. We also build stages and take care of all other entertainment on the big stage in Lundagård. If you love music and fancy hanging out in the backstage area during Lundakarnevalen, the Music section is the right choice for you! Welcome!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Tombolan',
      nameEn: 'The Tombola',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Tombolan består av ett antal Tombola-bodar som innehåller unika varianter av spel och lotteri. Dessa spel och lotterier ska genomsyras av imaginalitet och studentikositet samtidigt som de ger Lundakarnevalens besökare någon form av upplevelse. Tombolan utmärker sig som sektionen där du som karnevalist får möjligheten att påverka besökarnas upplevelse då bodarnas koncept tas fram tillsammans.',
      textEn: 'The Tombola consists of a number of tombala booths with unique games and lotteries, all of which are inspired by imaginality and traditions from student life in Lund. The booths will give Lundakarnevalen’s visitors an exceptional experience! As a karnevalist in this section you have the opportunity to influence what will be remembered by the visitors. Together we design the concept of each booth! ',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog Gamla Kirurgen',
      nameEn: 'Pub Gamla Kirurgen',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Bra mat, bra musik, bästa hänget och skönaste festen. Krog Gamla kirurgen är en oas i karnevalskaoset där gäster ska kunna slappna av och njuta av riktigt bra mat i en häftig miljö. Vi söker de som vill laga mat i världsklass, poppa flaskor bakom champagnebaren, boka coola lokala artister och bygga en festivalrestaurang som Lund aldrig tidigare har skådat!',
      textEn: 'Great food, great music, the best lounge and the coolest party. Pub Gamla Kirurgen is an oasis of calm in the chaos of Lundakarnevalen where guests can relax and enjoy awesome food in a cool environment. We are looking for people who want to cook world class food, pop bottles in a champagne bar, book cool local musicians and build a festival pub unlike anything seen before in Lund!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Smånöjena',
      nameEn: 'The wee three',
      imageUrl: 'http://lundakarnevalen.se/wp-content/themes/wpKarneval2/img/day.jpg',
      textSv: 'Mitt i vimlet i Lundagård sätts det upp tre föreställningar i varsitt tält, interaktiva, annorlunda och väldigt spännande - Sketchofori, imTV och Mediamonster! Vi är unika, då vi är just tre smånöjen som samarbetar och har kul tillsammans redan långt innan karnevalshelgen. Var med och skapa en av dessa tre fantastiska produktioner',
      textEn: 'In the middle of the action in Lundagård, three interactive, different and exciting spectacles are set up: Sketchofori, imTV and Mediamonster! We are unique in being three smaller productions, working together closely, that start having fun long before the carnival weekend. Join us in creating one of these fantastic shows!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {})
  }
}
