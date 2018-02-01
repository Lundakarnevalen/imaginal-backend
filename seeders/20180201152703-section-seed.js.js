'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'AdministerIT',
      nameEn: 'AdministerIT',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/administerit.png',
      textSv: 'AdministerIT bringar ordning och reda i den karnevalistiska yran! Som karnevalist i AIT stöttar du andra sektioner genom att bistå med information, hålla pli på karnevalens lånebilar och se till att karnevalister är rätt registrerade. Vi är de som bygger den digitala karnevalvärldens medel i form av appar, hemsidor och annat som kan behövas. Lär dig koda och gör Lundakarnevalen än mer cybertastic!',
      textEn: 'AdministerIT works behind the scenes: Join AIT and become every section’s hero by supporting your fellow karnevalists with information, digital systems and registration. With the creation of our apps and websites we’ve built Lundakarnevalen’s digital playground. Learn to code and make Lundakarnevalen even more cybertastic!',
      longTextSv: 'AdministerIT supportar och underlättar för karnevalisterna både IRL och på nätet! Vi har skapat\n' +
      'både hemsida och app och har sedan september stöttat bakom kulisserna. Här finns utrymme för\n' +
      'såväl erfarna programmerare som inte kan få nog samt entusiaster som vill lära sig mer.\n' +
      'I vår expedition kommer administreringen av alla karnevalister att skötas, karnevalistkort skapas\n' +
      'och en bilpool rulla igång. Bemanningen kommer vara hög då vi har öppet alla veckodagar. Som\n' +
      'expare förväntas du därmed lägga några timmar varje vecka på karnevalen. Jajamän, för att kunna\n' +
      'finnas till hands och vara behjälpliga så arbetar vi intensivt under hela våren, såväl dag- som\n' +
      'kvällstid. Något som vi belönas för under karnevalshelgen då det kommer finnas utrymme att\n' +
      'uppleva allt som de andra sektionerna arbetat hårt med!\n' +
      'Som sektion kommer vi till slut att bli kring 80-120 karnevalister, en härlig blandning av Expare\n' +
      'och ITisar samt några vierister som anordnar massa roligheter för sektionen!',
      longTextEn: 'AdministerIT is the true support section of Lundakarnevalen! We support our fellow sections by\n' +
      'providing an information desk where Karnevalists can get help when in need and by offering\n' +
      'IT-solutions that make everyday tasks easier.\n' +
      'In our information desk we’ll manage karnevalists, create karnevalist-IDs and manage the carpool.\n' +
      'The information desk will be open every day, so we’ll need your help a couple of hours per week.\n' +
      'If you’ve dreamt about becoming an natural at coding, you should join our section! We have a spot\n' +
      'for both the more experienced programmer as well as for enthusiasts who wish to evolve their\n' +
      'skills. To ensure that all karnevalists receive the support they need, we’ll work intensely\n' +
      'throughout spring, both day- and night. Though in the end we’ll be rewarded during the actual\n' +
      'carnival days, since we’ll be able to enjoy all the fun things that the other sections have created\n' +
      'during the spring.\n' +
      'Our section will consist of around 80 to 120 karnevalists. We’ll be a great mix of programmers\n' +
      'and receptionists as well as our vierists, the ones organizing lots of fun activities for our section',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Biljonsen',
      nameEn: 'Biljonsen',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/biljonsen.png',
      textSv: 'Biljonsen, en förkortning av Biljett- och sponssektionen, är Lundakarnevalens monetära flytväst. Genom att sälja biljetter och att ha goda relationer med Karnevalsvänner ser vi till att det blir en Lundakarneval vart fjärde år. Vi letar efter glada biljettsäljare, vierister och de som vill syssla med ekonomi. Vill du ha Lundakarnevalen på en stadig grund? Kolla in Biljonsen!',
      textEn: 'Biljonsen is responsible for all of Lundakarnevalen’s revenues. We sell all the tickets for the main shows and handle the relationships with our partners and sponsors. For the English speaking students we are mainly looking for people who want to work in the Vier, which means to create a feeling of community and make sure that the spring of 2018 will make the best memories! ',
      longTextSv: 'Biljonsen, en förkortning av Biljett- och sponssektionen, är Lundakarnevalens monetära flytväst.\n' +
      'Genom att sälja biljetter till varenda kotte och att ha goda relationer med Karnevalsvänner ser vi\n' +
      'till att det blir en Lundakarneval vart fjärde år och att alla vet att den händer. Biljonsen har också\n' +
      'hand om alla gynnare som går i god för Lundakarnevalens ekonomi.\n' +
      'För många är Biljonsen de första karnevalister de träffar genom att vi säljer biljetter till dem i\n' +
      'bodar på stan, vi ger Lundakarnevalens första intryck! I Biljonsen kan en sälja biljetter, syssla med\n' +
      'vieri, ekonomi, IT eller vara del i våra många företagsrelationer. I Biljonsen får en chans att lära\n' +
      'känna många Karnevalister innan maj och får ta det lugnt under själva Karnevalsdagarna.\n' +
      'Som sektion kommer vi bli runt 150 stycken Imaginalkarnevalister. Kolla in Biljonsen, det blir\n' +
      'gött!',
      longTextEn: 'Biljonsen is responsible for all of Lundakarnevalen’s revenues. We sell all the tickets for the main\n' +
      'shows and handle the relationships with our sponsors. We also handle important relations with\n' +
      'Lundakarnevalen’s partners who secure our finances in case of loss. For many visitors, Biljonsen is\n' +
      'the first they see of Lundakarnevalen, which means we get to make the first impression!\n' +
      'We’ll be about 150 Karnevalists who’ll be working mostly before the carnival days so that we can\n' +
      'enjoy what all the other section have been working on during Lundakarnevalen. For the english\n' +
      'speaking community we are mainly looking for people who want to work in the Vieri which means\n' +
      'to create a feeling of community and make sure that the spring of 2018 will make the best\n' +
      'memories for all of our Karnevalists! Come join Biljonsen!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Ekonomi',
      nameEn: 'The Economy Section',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/ekonomi.png',
      textSv: 'Ekonomisektionen är Lundakarnevalens egen centralbank! Vår uppgift är att hålla koll på stålarna, där bidrag, bokföring, betallösningar och kontantsäkerhet är några av våra specialområden. Som stöd till de andra sektionerna möjliggör vi allt karnevalistiskt skoj och trams som är Lundakarnevalen. Häng med oss och se till att göra alla karnevalsvårens imaginaliteter till verklighet!',
      textEn: 'The financial section is the central bank of Lundakarnevalen. Our task is to keep track of the money, where grants, bookkeeping, payment solutions and cash safety are some of our areas of expertise. To support other sections we enable all the spoofs and jinks that make up Lundakarnevalen. Join us and help realise the imaginalities the spring will bring!',
      longTextSv: 'Vi i Ekonomisektionen ser till att Lundakarnevalens vildaste fantasier kan bli till liv. För att kort\n' +
      'beskriva oss kan man man kalla oss för Lundakarnevalens egna centralbank. Vi är de som har koll\n' +
      'på stålarna och är något av experter på bokföring, bidragssökning, betallösningar och\n' +
      'kontantsäkerhet. Vår vision är att vi ska vara ett stöd till Lundakarnevalens alla sektioner och att\n' +
      'vi tillsammans ska skapa en Imaginalkarneval utan dess like. Under själva Lundakarnevalen är vårt\n' +
      'största fokus på logistik och support för betallösningar, kontantsäkerhet och att se till att ständigt\n' +
      'kunna ge ut en löpande resultatrapport.\n' +
      'Som sektion kommer vi tillslut bli omkring 30 karnevalister. De kommer tillsammans med oss att\n' +
      'skapa följande team:\n' +
      '* Bokföringsteamet, precis som det låter är de fenor på bokföring.\n' +
      '* Bidragsteamet, är riktiga hejare på att söka bidrag och se till så att karnevalen kan nå nya\n' +
      'höjder.\n' +
      '* Säkerhetsteamet, jobbar med vår riskbedömning och hanterar all kontantsäkerhet.\n' +
      '* Kassa- och logistikteamet, har stenkoll på karnevalens betallösningar och är även\n' +
      'ansvariga för att ständigt rapportera resultat.\n' +
      '* Vieri, är med och skapar en vi-känsla och kokar ihop massa roligheter.\n' +
      'Vårt mål är alltså att se till så att Lundakarnevalen 2018 ej begränsas utan kan leva ut sina\n' +
      'vildaste fantasier!',
      longTextEn: 'The Economy section makes sure that Lundakarnevalen’s wildest fantasies can come to life. To\n' +
      'briefly describe us, you can call us Lundakarnevalen’s own central bank. Our task is to keep track\n' +
      'of the cash, where grants, bookkeeping, payment solutions and cash safety are some of our areas\n' +
      'of expertise. Our vision is that we will be a support for all the sections of Lundakarnevalen and\n' +
      'that we together will create an amazing, imaginal Lundakarnevalen.\n' +
      'During the carnival days, we’ll mainly focus on logistics and support for payment solutions, cash\n' +
      'security, and to ensure that we can continually publish an ongoing performance report.\n' +
      'As a section we will be around 30 Karnevalists who’ll form the following teams:\n' +
      '*The accounting team, just as it sounds, they are real stars of accounting.\n' +
      '*The financial team, are really good at seeking contributions and making sure Lundakarnevalen\n' +
      'can reach new heights.\n' +
      '*The security team, works with our risk assessment and manages all cash security.\n' +
      '*The cash and logistics team, are in charge of the payment solutions and is also responsible for\n' +
      'reporting results.\n' +
      '*Vieri, creates magic and fun memories for the section.\n' +
      'As mentioned earlier, we support all of Lundakarnevalen’s sections, and our goal is to make sure\n' +
      'that Lundakarnevalen 2018 will be limitless and can realize its wildest fantasies.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Dansen',
      nameEn: 'Dansen',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/dansen.png',
      textSv: 'Vill du vara med och anordna Sveriges största klubb? Dansen söker glada personer som vill syssla med allt från servering, till musik, mat, scenbygge, ekonomi och allt annat som behövs för en bra fest! Under våren trummar vi tillsammans fram rytmen för festligheterna, för att sedan förverkliga allas drömmar i AF-Borgen under karnevalsdagarnas nätter.',
      textEn: 'Would you like to be involved in the biggest club in Sweden? Dansen is looking for people who want to contribute to making exceptional parties; help with serving beverages and food, stage building, music and everything else is needed to create a party! This spring we will plan the festivities together, so that the party in AF Borgen during Lundakarnevalen will be something to remember.',
      longTextSv: 'Dansen fixar festen, bokstavligt talat. Dansen är den sektion som håller i festligheterna som äger\n' +
      'rum i AF-Borgen under karnevalsdagarnas nätter. Här finns det något för alla, oavsett om man är\n' +
      'intresserad av servering, scenbygge, säkerhet, ekonomi, musik eller kanske vara med och anordna\n' +
      'events under våren för alla karnevalister i sektionen. Kort och gott, vi fixar med allt som behövs\n' +
      'för en bra fest!\n' +
      'Som karnevalist i Dansen hjälper man till antingen inför helgen eller under en av de tre\n' +
      'karnevalsdagarna,, vilket innebär att man kommer ha gott om tid att uppleva Lundakarnevalen. Vi\n' +
      'kommer vara ungefär 500 karnevalister i sektionen totalt, som sedan blir fördelade i mindre\n' +
      'grupper enligt vilken dag man jobbar och vad man ska jobba med. Det finns alltså gott om\n' +
      'möjligheter att lära känna väldigt många härliga människor. Är man sugen på att testa, eller redan\n' +
      'är ett proffs, på att ta lite mer ansvar finns det utrymme för det också, till exempel som barchef!\n' +
      'Tillsammans ser vi till att allas drömmar slår in i AF-Borgen!',
      longTextEn: 'When P!NK wrote “Get the Party Started” she obviously referred to Dansen, the section\n' +
      'organising the party in the AF-building during Lundakarnevalen. Dansen will consist of around\n' +
      '500 Karnevalists doing everything that is needed for a good party. We do everything from serving\n' +
      'beverages and food, stage building, music and security as well as organising events to get to know\n' +
      'each other during the spring. Long story short, we organize everything need for a good party!\n' +
      'As a Karnevalist of Dansen you’ll either help out before the carnival weekend or during one of the\n' +
      'three carnival days, so you’ll have plenty of time to see the rest of the attractions and events.\n' +
      'Besides, if you are looking to improve, or perhaps already have mastered, your management skills\n' +
      'there are some opportunities for that too!\n' +
      'Together we will make everyone\'s dream come true!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog - Krogen vid karnevalens slut',
      nameEn: 'Tavern - The tavern at the end of the carnival',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/krogarna.png',
      textSv: 'Vill du vara med i en uppslukande krogupplevelse? Sök då till Krogen vid Karnevalens slut. Här kommer vi bjuda på en annorlunda upplevelse med mat, dryck och umgänge! Vi ska tillsammans mätta alla besökares magar, släcka deras törst, och tillfredställa deras behov på ett imaginalt vis. Vi söker dig som vill jobba med mat, dryck, underhållning och organisation i ett enda stort, imaginalt hopkok.',
      textEn: 'Do you want to be part of an immersive tavern experience? Then join The Tavern at the End of the Carnival. We will offer a divergent experience with food, beverages, and much more. Together we will still people\'s hunger, quench their thirst, and satisfy all of their needs in an imaginal fashion. We\'re looking for those who want to work with food, beverage, entertainment, and organisation in one big, imaginal concoction.',
      longTextSv: '',
      longTextEn: '',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog - Den Stegrande Enhörningen',
      nameEn: 'Tavern - The prancing unicorn',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/krogarna.png',
      textSv: 'En kulinarisk upplevelse med karnevalistisk twist, guidad av en galopperande enhörning - det är ledorden för Krog Den Stegrande Enhörningen! Brinner du för att laga mat? Vill du skapa glädje bakom baren? Eller drömmer du i hemlighet om uppfyllda brandsäkerhetsföreskrifter? Skapa krogen där fantasi och verklighet blandas till en upplevelse att minnas!',
      textEn: 'An experience serving food and drinks with a twist and a unicorn guiding the way. Happiness and creativity are the characteristics of our tent, where magic happens. Do you have a passion for cooking? Do you want to spread joy behind the bar? Or do you get fired up thinking about fire safety? Create a tavern where imagination meets reality in an event worth remembering.',
      longTextSv: 'Vad är egentligen en karnevalistisk krog? En karneval i en krog? En vanlig krog i en karneval? Eller\n' +
      'en kanske upplevelse med mat och dryck? Precis! En karnevalistisk krog är en plats som bara\n' +
      'existerar tre dagar vart fjärde år, en plats byggd av karnevalistisk glädje och en nypa magi. Den\n' +
      'serverar mat och dryck som inte går att hitta någon annanstans. Vad är ens en karnevöl? Hur kan\n' +
      'ett tält servera över 1000 rätter på en dag? Låter det spännande? Eller kanske rent av... Imaginalt?\n' +
      '* Har du en passion för matlagning? Härligt, vi söker dig som vill anta utmaningen att jobba\n' +
      'med naturligt färgsprakande mat som är lika god som vacker\n' +
      '* Har du ett intresse för att stå bakom baren? Vilken tur, vi vill ha glada karnevalister som\n' +
      'med roliga små påhitt skapar en levande bar, full av överraskningar\n' +
      '* Drömmer du i hemlighet om att bli FBI agent? Testa på att vara säkerhetskarnevalist och\n' +
      'se till att det stora folkflödet flyter på utan störningar och att alla känner sig välkomna\n' +
      '* Har du ett öga för design? Då är du rätt, hjälp till att skapa den magiska platsen vi\n' +
      'drömmer om! Det imaginala har ingen gräns\n' +
      '* Gillar du utmaningar? Det gör vi med och vi letar efter fler drivna personer som kan vara\n' +
      'med och skapa tidernas mest Imaginala krog.\n' +
      'Vi kommer tillslut att bli 150-200 entusiastiska karnevalister som under våren tillsammans ska\n' +
      'spåna, planera och tillslut skapa Den Stegrande Enhörningen. Tillsammans gör vi karnevalsvåren\n' +
      'oförglömlig!',
      longTextEn: 'What is a karnevalistic pub? A carnival in a pub? A pub in a carnival? Or maybe a karnevalistic pub\n' +
      'is a venue existing only three days every fourth year, a place built upon karnevalistic happiness\n' +
      'and a sprinkle of magic. The pub serves food and beverages not to be found anywhere else. What\n' +
      'is a karnevöl? How can a tent serve more than one thousand plates of food in just a day? Does it\n' +
      'sound exhilarating? Or maybe even… Imaginary?\n' +
      '* Do you have a passion for cooking? Great! We are looking for people who want to take on\n' +
      'the challenge in working with naturally colorful food, refining dishes to make them both\n' +
      'beautiful and delicious.\n' +
      '* Do you want to be behind the bar? Lucky you! We are looking for happy Karnevalists to\n' +
      'create a living bar, full of surprises limited only by your imagination.\n' +
      '* Are you secretly dreaming of becoming an FBI-agent? Join our security-team, helping us\n' +
      'to make sure that we have a safe and welcoming environment.\n' +
      '* Do you have an eye for design? You are in the right place! Help us creating the magical\n' +
      'venue we all dream of. Your imagination has no limits.\n' +
      '* Do you like challenges? So do we, and we are looking for ambitious people who want to\n' +
      'join us in creating the most imaginary restaurant of all times.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog - Foodtrucks',
      nameEn: 'Tavern - Foodtrucks',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/krogarna.png',
      textSv: 'Välkommen till Krog Foodtrucks, en av Lundakarnevalens splitternya sektioner! Hos oss får du möjlighet att göra något helt unikt och sätta prägel på Lundakarnevalen. Här ser vi till att Lundakarnevalens besökare får magarna fulla av god, fräsch streetfood i karnevalistisk tappning. Här har du möjlighet att laga mat, snacka strunt med Lundakarnevalens besökare, kränga öl eller ordna fester i vårt kalaskula vieri!',
      textEn: 'Welcome to the Foodtrucks, a brand new section in Lundakarnevalen! Together we’ll create something unique and make our mark on Lundakarnevalen. We’re the ones that make sure hungry visitors get their bellies filled with delicious street food with a karnevalistic twist. Join us if you want the opportunity to cook, chat with our customers, sell beer or arrange parties for our karnevalists!',
      longTextSv: 'Krog Foodtrucks är karnevalens sprillans nya sektion som ser till att hungriga\n' +
      'besökare snabbt får något fräscht, gott och imaginalt i magen samtidigt som de fritt\n' +
      'kan besöka resten av karnevalsområdet. Vi letar efter folk med samma härliga vision\n' +
      'som oss – att ge både besökare och sektionen bästa möjliga upplevelse. Du som gillar\n' +
      'att laga mat, kränga öl eller snacka strunt med kunder kommer verkligen till ditt esse\n' +
      'här och som grädde på moset får du dessutom vara med och forma något helt nytt i\n' +
      'Lunds rika studentliv!\n' +
      'Innan karnevalen drar igång har vi, förutom de roligheter som vårt fantastiska vieri\n' +
      'anordnar, även ett par tillfällen där vi ses för att lära oss allt vad en imaginal\n' +
      'foodtruck innebär. Under karnevalshelgen kommer du tillsammans med ditt jobblag att\n' +
      'ansvara för två pass i en av våra foodtrucks där du förväntas vara effektiv, arbetsvillig\n' +
      'men framförallt ha kul med en skön attityd. Slutligen kommer vi som sektion att bestå\n' +
      'av hela 170 karnevalister som sköter allt från mat och försäljning till säkerhet och\n' +
      'interna festligheter. Vår förhoppning är att Krog Foodtrucks i Lundakarnevalen 2022\n' +
      'permanentas som den bästa nymodigheten sedan 1849 – något som såklart\n' +
      'börjar med vårt team!',
      longTextEn: 'The newest addition to Lundakarnevalen! Tavern Foodtrucks will provide delicious food with an\n' +
      'imaginal twist for hungry visitors as they roam the other attractions in the area. What we are\n' +
      'looking for are people who have the same vision as us – those who enjoy cooking awesome food,\n' +
      'selling great beer and chat away with the customers to make this the best experience possible for\n' +
      'both the work team as well as the visitors! Not only will you be able to shine with your social skills,\n' +
      'but you will be a part of a team creating something brand new that has never been done before in\n' +
      'the history of student life in Lund.\n' +
      'We are starting off with some festivities and fun get-togethers during the spring so you will get to\n' +
      'know each other in your teams, we will also kick it all off with learning everything there is to know\n' +
      'about the great world of foodtrucks. The team you will be working with will be responsible for two\n' +
      'shifts during the carnival days where you are expected to be efficient and industrious, but above\n' +
      'all having fun. Our goal is that by the next Lundakarnevalen 2022, Foodtrucks will be named the\n' +
      'greatest novelty in Lundakarnevalen since 1849 – and it all starts this year with our team!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog - Södersken',
      nameEn: 'Tavern - Södersken',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/krogarna.png',
      textSv: 'Bra mat, bra musik, bästa hänget och skönaste festen. Krog Södersken är en oas i karnevalskaoset där gäster ska kunna slappna av och njuta av riktigt bra mat i en häftig miljö. Vi söker de som vill laga mat i världsklass, poppa flaskor bakom champagnebaren, boka coola lokala artister och bygga en festivalkrog som Lund aldrig tidigare har skådat!',
      textEn: 'Great food, great music, the best lounge and the coolest party. Tavern Södersken is an oasis of calm in the chaos of Lundakarnevalen where guests can relax and enjoy awesome food in a cool environment. We are looking for people who want to cook world class food, pop bottles in a champagne bar, book cool local musicians and build a festival tavern unlike anything seen before in Lund!',
      longTextSv: 'Krog Södersken är den självklara destinationen för alla som älskar bra mat. Vi kommer att vara en\n' +
      'oas av härlig stämning bland allt karnevalistiskt stimmande. Här kommer det finnas en häftig\n' +
      'blandning av otroliga färdigheter som möter all den glada entusiasm som man bara kan hitta i\n' +
      'Studentlund. Är du proffs i nationsköket, bäst på teknik, kan boka artister eller helt enkelt taggad\n' +
      'på att bygga Lunds fetaste festivalområde, då hör du hemma hos oss!\n' +
      'När maj rullar in i Lundagård kommer vi att förvandla Eden till ett riktigt paradis för\n' +
      'matentusiaster och under själva Lundakarnevalen kommer bemanningen att vara hög då vi under\n' +
      'tre intensivt roliga dagar ska servera närmare 8000 maträtter och 34 000 karnevöl.\n' +
      'Som sektion siktar vi på att bli hela 450 karnevalister, kockar, vierister, grafiska designers,\n' +
      'bartenders, områdes- och säkerhetsstjärnor, alla proffs på hur man har den roligaste våren i sitt\n' +
      'lundaliv!',
      longTextEn: 'Tavern Södersken is the obvious destination for anyone who loves good food. We will be an oasis\n' +
      'of cool lounging among all the stunts of Lundakarnevalen. There’ll be a cool blend of incredible\n' +
      'skills which mixes with all the happy enthusiasm that you only can find in Studentlund. Are you a\n' +
      'pro in the kitchen of a student nation, the best at lights and sounds, can book artists or simply\n' +
      'focus on building Lund\'s fiercest festival area, then you\'ll be at home here!\n' +
      'As the month of May rolls into Lundagård, we’ll turn Eden into a real paradise for food enthusiasts\n' +
      'and during the carnival days, the workload will be high as we’ll serve nearly 8000 dishes and\n' +
      '34,000 karnevöl, Lundakarnevalen’s own beer, for three intense fun days.\n' +
      'As a section we aim to be a total of 450 Karnevalists, chefs, vieri, graphic designers, bartenders,\n' +
      'heroes of area management and safety stars, all pros in how to have the most memorable spring\n' +
      'in their Lunda life!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krog - Krog Upp å Ner',
      nameEn: 'Tavern Upp å Ner',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/krogarna.png',
      textSv: 'Välkommen till krogen som är Upp och Ner. Här kan vi lära dig mer Om att servera i karnevalens mitt\n' +
      'Fest, dans och annat påhitt\n' +
      'Vill du laga massa god mat?\n' +
      'För att sedan servera hundra fat\n' +
      'Inte bara massa tråkigt att förbereda\n' +
      'också att hålla ordning och reda.\n' +
      'Fixa lekar, fest och stoj\n' +
      'Tycker du att räkna eller dekorera är skoj?\n' +
      'Kom hit för karnevalens bästa häng\n' +
      'Vill inte du bli del av vårt gäng?\n',
      textEn: 'Welcome to the tavern that turns Karnevalists n their head. In our section we make visitors stretch their imaginary limitations, all while defying physics in all the gravitational manners. A culinary experience that makes your stomach turn just the right way, serving delicious mind bending food and mouthwatering head flipping drinks.',
      longTextSv: 'Vår sektion kommer vara en del av den mytomspunna krogmetropolen med en vriden touch\n' +
      'belägen mitt i Lundakarnevalens centrum. Vi uppfyller legenden på denna plats, berömd för att\n' +
      'förse Lundakarnevalens besökare med mat och dryck i en sann karnevalistisk atmosfär. En\n' +
      'kulinarisk upplevelse som får det att kittlas i kistan, fantastisk häpnadsväckande mat tillsammans\n' +
      'med en bar som erbjuder diverse läckra drycker. Du också välkommen här att slå klackarna i taket\n' +
      'till levande musik i dess högsta grad.\n' +
      'Hos oss finns det något för alla!\n' +
      '* Det grymma Köket som fixar underbar mat\n' +
      '* Bar och Säkerhet - bäst på service med allehanda drycker och absolut koll på stället\n' +
      '* Vieriet står för vi-känslan. De skapar evenemang och stöttar sektionen för att vi ska ha\n' +
      'den bästa karnevalen någonsin\n' +
      '* Området skaffar oss tält över huvudet för alla regniga dagar, ljus för fest in till\n' +
      'gryningen och musik för att hänga till natten lång\n' +
      '* Ekonomi- och Kommunikation-sektionerna är den grund som vi bygger krogen på. Här\n' +
      'hittar du människorna som bryggar delarna av sektionen, utan dessa finns ingen\n' +
      'enhetlig och fungerande krog.\n' +
      'Vill du vara vara en del av ca 270 karnevalister och ta del av en fantastisk gemenskap under\n' +
      'vårterminen? Tillsammans kommer vi ta steget från imaginal till verklighet och tillbaka igen!',
      longTextEn: 'Our section is a part of the mythical tavern world, and with a little twist, is located in the heart of\n' +
      'Lundakarnevalen. We fulfill the legend in this place, famous for providing visitors of\n' +
      'Lundakarnevalen with food and drinks, by embracing the karnevalistic spirit. A culinary\n' +
      'experience that pleases your stomach, amazing food from our kitchen and various delicious drinks\n' +
      'served up in our bar. But that’s not all: with live music we’ll create the perfect atmosphere for this\n' +
      'karnevalistic experience.\n' +
      'We have something for everyone!\n' +
      '* The accomplished kitchen with wonderful food\n' +
      '* The Bar and Safety teams, top-notch in service and keeping a cool head in a heated\n' +
      'situation\n' +
      '* The Vieri that stands for team-building and a great community They create events and\n' +
      'make sure we have the best time ever\n' +
      '* The area team fixes a tent over our heads for rainy days, lights for dancing until dawn\n' +
      'and music to hang out to all night\n' +
      '* Accounting as well as Communication teams that are the ground that our pub stands\n' +
      'on. They bridge the gap between the different sections and organise us all into a well\n' +
      'working group\n' +
      'Would you like to be one of 270 Karnevalists and a great community? Together we’ll go from\n' +
      'imagination to reality and back to the imaginall Lundakarnevalen!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Krögeriet',
      nameEn: 'Krögeriet',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/krogeriet.png',
      textSv: 'Wehej och välkommen till Krögeriet! Vi ser till att våra karnevalister varken går hungriga eller törstiga  magar är mätta och törstar släckta under Lundakarnevalen. Vi har hand om all dryck - karnevöl, karnevatten, karneyounameit - som ska förtäras under Lundakarnevalen.. Dessutom ser vi till att VIP och karnevalsvänner har det bra. Häng med oss och se till att alla får fantastiska karnevalistiska dagar i maj!',
      textEn: 'Welcome to Krögeriet! It’s our job to make sure that everyone working at Lundakarnevalen have somewhere to eat and relax. We also work behind the scenes with all liquids that will be consumed during Lundakarnevalen. In Krögeriet we have everything from a gourmetresturang to security work and warehousing. Join us in Krögeriet and have your best experience in Lund.',
      longTextSv: 'Vi är sektionen som erbjuder allt ifrån mat och dryck av yppersta klass till säkerhet- och\n' +
      'lagerarbete. I krögeriet finns det plats för alla. Vi är en del av Festmästeriet och kommer jobba\n' +
      'tillsammans med flera av sektionerna där. Tillsammans tar vi hand om all mat och dryck för hela\n' +
      'Lundakarnevalen!\n' +
      'Vi i Krögeriet har tre olika arbetsområden, dessa är:\n' +
      '* Bamban! Alla karnevalisters matsal där du tillsammans med ett härligt gäng ser till att\n' +
      'ingen karnevalist går hungrig.\n' +
      '* VIP:en! Här satsar vi på god service och lyxig mat till Lundakarnevalens sponsorer och\n' +
      'vänner.\n' +
      '* Lagret! Det är här all dryck förvaras och distribueras ut till krogar och gäster, ett tight\n' +
      'gäng kommer se till att ingen går törstig under Lundakarnevalen!\n' +
      'Vi kommer vara cirka 250 karnevalister i Krögeriet och all vår verksamhet sker i AF-Borgen.\n' +
      'Mycket kul kommer ske under våren men det är främst under karnevalsdagarna då vi får visa vad\n' +
      'vi går för!',
      longTextEn: 'We are the section that offers everything from great food and delicious drinks to warehousing\n' +
      'and safety. Everyone is welcome to Krögeriet! We are a part of Festmästeriet and together with\n' +
      'the other sections of Festmästeriet we take care of all food and drinks for the whole\n' +
      'Lundakarnevalen!\n' +
      'We in Krögeriet have three different areas of work, these are:\n' +
      '* Bamban! The dining hall for all Karnevalists, where you together with a great bunch of\n' +
      'people will see to it, that no Karnevalist is hungry.\n' +
      '* VIP:en! The place where we offer fine dining and good service for the sponsors and\n' +
      'friends of Lundakarnevalen.\n' +
      '* The warehouse! This is where all drinks are stored and distributed to taverns and guests,\n' +
      'a great team will help us to ensure nobody is thirsty during Lundakarnevalen!\n' +
      'We’ll be around 250 Karnevalists in Krögeriet and all our participation will take place in the\n' +
      'AF-building. Lots of fun things and events will happen during this spring but we’ll mainly work\n' +
      'during the carnival days, when we have the opportunity to show what we are made of!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Kommunikation',
      nameEn: 'Communication',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/komsek.png',
      textSv: 'Vi får intern, extern och digital kommunikation att funka. Vi håller alla uppdaterade kring gårdagens händelser och senaste nytt. Vem vet vad morgondagen bringar? Vi vet. Du gör inte - än. Sök till oss, lös problem innan de uppstår och sprid ordet om det mest imaginala 2018: Lundakarnevalen!',
      textEn: 'We make internal, external and digital communication work. We see to it that everyone involved is kept up to date with recent events and the latest news. Who knows what tomorrow will bring? We do. You don’t - yet. Join us, solve problems before they even exist and help spread the word about the most imaginal event of 2018: Lundakarnevalen!',
      longTextSv: 'Med ett snitsigt och glädjefyllt tänk jobbar kommunikationssektionen med två spännande\n' +
      'områden:\n' +
      '* Att locka besökare genom extern marknadsföring av Lundakarnevalen.\n' +
      '* För att samordna och internt sprida viktig information till alla karnevalister.\n' +
      'Vi blir cirka 50-80 glada typer som under hela våren jobbar för att få Lundakarnevalens olika\n' +
      'beståndsdelar att andas i takt med varandra. Vi försöker lösa problemen innan de uppstår och att\n' +
      'ha svaret innan frågan ställts. Som ett smörjmedel, en spindel i nätet och ett sammanfogande\n' +
      'klister för hela Lundakarnevalen!\n' +
      'Vår interna kommunikation sker främst med hjälp av grymma digitala hjälpmedel som Workplace,\n' +
      'Gmail och Podio där vi strukturerar, kommunicerar och informerar. Vi arbetar i nära relation med\n' +
      'alla andra sektioners kommunikationschefer för att hålla koll på vad som händer i varje hörn av\n' +
      'Lundakarnevalen så att alla kan bli upplysta om vad för kul som pågår. Som sektion arbetar vi\n' +
      'även med extern kommunikation som marknadsföring, PR och sociala medier. Den externa\n' +
      'kommunikationen (som vi hoppas ni redan märkt av) går därför att iaktta på Facebook och\n' +
      'Instagram samt att läsa över dagspress, affischer och mailutskick.\n' +
      'Allt detta skapas med ett finurligt och snitsigt karnevalistiskt tänk i bakhuvudet!\n' +
      'Kul! Och väldigt viktigt!',
      longTextEn: 'With inspirational and joyful thinking the communication section focuses on two exciting tasks:\n' +
      '* to attract lots of visitors to by promoting and marketing Lundakarnevalen\n' +
      '* to coordinate and make sure that important information reaches all karnevalists\n' +
      'Through all of spring, we’re going to be a cheerful bunch of 50 to 80 karnevalists. Our goal is to\n' +
      'get the different parts of Lundakarnevalen to be in sync and run like clockwork. We solve\n' +
      'problems before they even exist and have all the answers that you are looking for (well, at least\n' +
      'the ones concerning Lundakarnevalen).\n' +
      'For our internal communication we use a few great digital tools, such as Workplace, Gmail and\n' +
      'Podio. They help us to distribute and coordinate all the information the karnevalists need to\n' +
      'know. We work close to the communication manager of each section - that’s how we always know\n' +
      'about all the incredible things that are going on at Lundakarnevalen during this spring. Apart from\n' +
      'that, we also make sure that not only the karnevalists know what’s going on but that the rest of\n' +
      'the world knows about the most imaginal event of the year! With PR, marketing and social media\n' +
      'we spread the word about Lundakarnevalen. Nobody should have to look for information for too\n' +
      'long, that’s why you can read about Lundakarnevalen on Facebook, Instagram, the daily press,\n' +
      'posters and different newsletters.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Mediahuset',
      nameEn: 'Mediahuset',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/mediahuset.png',
      textSv: 'Mediahuset är en skön mix av radio, klipperi och foto! Radion sänder under våren och sen från en glasbur musikhjälpen-style under karnevalsdagarna. Klipperiet kommer att göra Lundakarnevalen ännu lite bättre med hjälp av rörlig bild (allt från reklamfilm till knasiga karnevalsklipp). Foto kommer att ansvara för att föreviga den magiska karnevalskänslan under våren. Låter detta amazeballs? Sök oss!',
      textEn: 'Mediahuset is a great mix of radio, film and photo! The radio team will broadcast during spring and then 24/7 during the carnival days from a glass cage. The film team will make Lundakarnevalen move, doing everything from commercials to creative carnival clips. The photo team will be responsible for catching that magic carnival feeling. Does this sound amazeballs? Join Mediahuset!',
      longTextSv: '',
      longTextEn: '',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Säkerhetssektionen',
      nameEn: 'The Safety Section / The Security Section?',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/sakerhet.png',
      textSv: 'Säkerhetssektionen ser till att alla karnevalister och besökare är och känner sig säkra och trygga under hela karnevalsvåren! Som säkerhetskarnevalist får du chansen att se Lundakarnevalens alla hörn - vad sägs om att ingå i mobila problemslösarteam, bli proffs på att prata radio, brandvakta publiktäta event, hänga i AF-Borgen eller anordna hyss i vårt egna vieri? Imaginala möjligheter!',
      textEn: 'The safety section ensures that all the Karnevalists and visitors of Lundakarnevalen are safe and happy. As a Karnevalist in the security section you get the chance to see every corner of Lundakarnevalen, as we’re always ready to solve problems as they emerge. Whether we’re fixing a broken fence, working with fire prevention or solving a conflict - be sure to be accompanied by this friendly bunch!',
      longTextSv: 'Säkerhetssektionen finns till för att alla karnevalister och besökare ska ha en säker, trygg och kul\n' +
      'Lundakarneval! Detta gör vi bland annat genom att samordna karnevalssjukvårdare, brand- och\n' +
      'ordningsvakter, all radiokommunikation, verksamheterna i AF-borgen, kommunikation med\n' +
      'externa säkerhetsaktörer och bistå andra sektioner med våra problemlösningsteam\n' +
      'insatsgrupperna!\n' +
      'Vilken av våra roller är då bäst för dig?\n' +
      '* Säkerhetssektionens insatsgrupper kommer kunna rycka in varhelst det behövs under\n' +
      'karnevalsdagarna - oavsett om det rör ett trasigt staket, en underbemannad bar eller\n' +
      'ett flödesstopp i ett stort publikhav!\n' +
      '* Våra brandvakter som patrullerar karnevalsområdet ser till att brandskyddet fungerar\n' +
      'som planerat\n' +
      '* Vill du vara med i karnevalens hjärta där beslut och samordning sker, är det\n' +
      'sambandscentralen med ansvar för radiokommunikation som är ditt kall!\n' +
      '* Har du stenkoll på allt praktiskt i AF-borgen? I sådant fall behöver karnevalen dina\n' +
      'expertkunskaper i borgmästeriet.\n' +
      '* Slutligen har vi vårt fantastiska säkerhetsvieri, som ser till att skapa glädje och\n' +
      'samhörighet genom hyss och ståhej!\n' +
      'Hojta gärna till om du vill ha mer ansvar - vi har många gruppchefsmöjligheter inom sektionen.\n' +
      'Sammanlagt kommer vi att bli över 200 personer i Säkerhetssektionen, ett fantastiskt stort och\n' +
      'härligt gäng som tillsammans ska få göra och uppleva den bästa Lundakarnevalen någonsin!',
      longTextEn: 'The fire & safety section makes sure that all the Karnevalists and visitors of Lundakarnevalen are\n' +
      'safe and happy! We coordinate everyone working with first-aid, fire prevention, radio\n' +
      'communication, and any other tasks that might need a last-minute rescue during the carnival\n' +
      'days. We simply solve problems as they emerge!\n' +
      'Alright, so which of our task groups is the best fit for you?\n' +
      '* The fire & safety section’s task forces will solve problems as they emerge. Anything from a\n' +
      'broken fence, an understaffed bar or a large crowd of people which need to be moved:\n' +
      'We’ll handle it!\n' +
      '* During the carnival days we’ll also have patrols walking around the entire area handling\n' +
      'fire prevention.\n' +
      '* If you enjoy being at the center of all things happening, then our radio communication\n' +
      'team is the spot for you!\n' +
      '* Are you an expert on all things concerning the AF building? In that case we’ll need your\n' +
      'expertise in our borgmästeriet.\n' +
      '* Last but not least we have our very own vieri, a group of people creating a feeling of\n' +
      'community by organizing events, games and get-togethers for all Karnevalists in the fire &\n' +
      'safety section!\n' +
      'In the fire & safety section, you truly get to see the whole world of Lundakarnevalen! So if you’re\n' +
      'not sure where you want to be, but think everything sounds fun and interesting, we’re the group\n' +
      'for you! If you like taking responsibility for a team, just let us know! We’re still looking for a couple\n' +
      'of team leaders. All in all, we’ll be more than 200 Karnevalists in the fire & safety section! With\n' +
      'this large and amazing group of people, we’ll strive to both make and experience the best\n' +
      'Lundakarnevalen of all times!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Showen',
      nameEn: 'Entertainment - Showen',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/nojen.png',
      textSv: 'Vill du tillsammans med nästan 100 andra Showerister skapa en karnevalsmusikal?\n' +
      'Showen är en föreställning, med en trerätters middag som kommer att hålla till i Tegnérs Matsalar i AF-borgen. Tillsammans kommer vi ta med tonvis med karnevalsbesökare på en resa genom det undermedvetna i en föreställning de sällan kommer att glömma!\n',
      textEn: 'Do you want to join about 100 other students and create a musical for Lundakarnevalen? Showen is a musical show with a three course dinner, that will play in Tegnérs Matsalar in AF-borgen. Together we will let thousands of visitors join us on a journey through the subconscious in a show they will never forget!',
      longTextSv: 'Vill du tillsammans med nästan 100 andra showerister skapa en karnevalsmusikal? Showen är en\n' +
      'musikalföreställning, med en trerätters middag, som kommer att hålla till i Tegnérs Matsalar i\n' +
      'AF-borgen. Tillsammans kommer vi låta tonvis med karnevalsbesökare följa med oss på en resa\n' +
      'genom det undermedvetna i en föreställning de sällan kommer att glömma! Från april kommer vi\n' +
      'träffas för att hänga och tillsammans skapa en föreställning som sen spelar under hela\n' +
      'karnevalen!\n' +
      'I showen kan man vara med och göra massa olika grejer, här kommer en lista!\n' +
      'Sexet - Stå i köket och laga en grym tre-rätters middag till vår publik.\n' +
      'Dekor - Bygg, måla och skapa scenografi för showen.\n' +
      'Syeri - Sy och klä karaktärerna i häftiga kläder.\n' +
      'Smink - Sminka skådisar så att de blir snygga.\n' +
      'Teknik - Ljud- och ljussätta scenen med blinkande lampor och feta högtalare.\n' +
      'Vieri - Ordna fester och se till så att alla showerister skrattar och mår bra.\n' +
      'Scen - Stå på scen; skådespela, dansa, sjung och tramsa.\n' +
      'Orkestern - Spela musik till föreställningen i orkestern.',
      longTextEn: 'Do you want to join about 100 other Karnevalists and create a musical for Lundakarnevalen?\n' +
      'Showen is a musical along with a three course dinner, that will play in Tegnérs Matsalar in the\n' +
      'AF-building. Together we will let thousands of visitors join us on a journey through the\n' +
      'subconscious in a show they will never forget! As of April we’ll get together and create a show\n' +
      'that will play every day at Lundakarnevalen!\n' +
      'In Showen you can do lots of different things, here are some examples:\n' +
      'Kitchen - Cook the amazing three course dinner for our guests.\n' +
      'Scenography - Build and paint the scenography for the show.\n' +
      'Clothing - Sew and put together clothes for the show’s characters.\n' +
      'Make-up - Put a face on the characters and make them look handsome.\n' +
      'Lights and sound - Put up sound and lights for the show.\n' +
      'Vieri - Plan parties for our Karnevalists and make sure they have an awesome time.\n' +
      'Stage - Stand on stage, act, dance and sing.\n' +
      'Orchestra - Play music during the show in the orchestra.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Tåget - Vagnsektionen',
      nameEn: 'The tain - The floats section',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/vagn.png',
      textSv: 'Vagnsektionen är en av tre sektioner som tillsammans utgör Lundakarnevalens hjärta, Karnevalståget! Vi ansvarar för innehållet i tåget. Hos oss kan du vara med och utveckla konceptet och bygga vagnar och mellanekipage eller vara värd för våra gästande orkestrar. Under karnevalshelgen kommer sedan din glädje och finurliga humor visas upp för tågets hundratusentals åskådare.',
      textEn: 'The carnival floats section is one of three sections in the carnival parade. Here you’ll develop the concept (Mars-April) and build (April-May) the carriages or be a host for the marching bands that are visiting Lundakarnevalen. During Lundakarnevalen your happiness and clever humour will be displayed for the hundreds of thousands of spectators of the parade.',
      longTextSv: 'Vagnsektionen är den av de tre sektionerna i Karnevalståget som ansvarar för innehållet. Vi\n' +
      'kommer producera och bygga alla vagnar och mellanekipage i tåget och är ansvariga för alla\n' +
      'orkestrar. Tillsammans med våra syskonsektioner Stationen och Fabriken kommer vi att\n' +
      'producera tidernas Karnevalståg. Hos oss är du antingen med och bygger en vagn eller så är du\n' +
      'värd för en av våra gästande orkestrar!\n' +
      'Orkestrar kommer från hela Skandianvien (och delar av Europa!) för att vara med i\n' +
      'Lundakarnevalen och du kan vara deras helt egen Lundensare. Du får hjälpa dem att hitta allt från\n' +
      'boende till bästa nattamatsfalafeln! Som vagnkarnevalist kommer du att ta en vagn eller ett\n' +
      'ekipage från idé till verklighet. Lundakarnevalen kulminerar för Vagnsektionen när alla 500\n' +
      'personer som har varit med och gjort det möjligt får visa upp sin finurliga humor för en halv miljon\n' +
      'åskådare på Lunds gator den 19:e och 20:e maj!',
      longTextEn: 'The floats section is one of three sections in the carnival parade and takes care of the actual\n' +
      'content. We will produce and build all the floats in the parade and are responsible for all marching\n' +
      'bands. Together with our siblings Fabriken and Stationen, we’ll create the most imaginal parade\n' +
      'of all times! As a Karnevalist in the floats section, you’ll either help building the floats or are a host\n' +
      'for our guest marching bands.\n' +
      'Marching bands from all over Scandinavia (and even parts of Europe) come to Lund to be a part of\n' +
      'Lundakarnevalen, and you have the chance to be their very own Lunda guide! You’ll be their go-to\n' +
      'person for anything, from finding their way around Lund to giving inside tips on Lund’s most\n' +
      'delicious falafel. When working with the floats, you’ll help ideas become reality!\n' +
      'Our work culminates when all of our almost 500 Karnevalists, who have been creating the\n' +
      'parade, will show our creation to half a million spectators during the carnival days in May.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Produkt - Snaxeriet',
      nameEn: 'Product - Snaxeriet',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/snaxeriet.png',
      textSv: 'Snaxeriet är Lundakarnevalens bränsledepå som säljer bland annat snax, kaffe och korv till alla karnevalsbesökare. Som karnevalist i Snaxeriet kan du få göra allt från att bada i popcorn och koka kaffe till att bygga imaginala försäljningsbodar, gå i tåget och ordna snaxiga fester. Garanterat fritt från nyttigheter och laddat med karnevalistiska dumheter!',
      textEn: 'Snaxeriet is the fuel depot of Lundakarnevalen and offers snacks, coffee and hot dogs e.g. to all of its visitors. As a Karnevalist in Snaxeriet, you will be able to do stuff ranging from swimming in a sea of popcorn and brewing coffee, to building stalls, being part of the parade and arranging snaxy parties. Guaranteed to be free from healthy food and brimming with karnevalistic mischief!',
      longTextSv: 'Med lika delar sunt oförnuft och osunda godsaker ser Snaxeriet till att karnevalister och besökare\n' +
      'håller bränslereserverna på topp under Lundakarneval i dagar tre! För att fylla alla magar med\n' +
      'popcorn, kaffe och annat gott så behöver vi just din hjälp!\n' +
      'Fram till karnevalen så kommer det att spånas fram finurliga försäljningsbodar i den imaginala\n' +
      'andan och därefter ska dessa förverkligas med hammare & spik, färg & pensel, nål & tråd - ja, ni\n' +
      'fattar! När själva Lundakarnevalen sedan är igång är det upp till oss att se till att ingen på\n' +
      'karnevalsområdet går hungrig, törstig eller utan ett rejält koffeinintag. Då gäller det att vi håller\n' +
      'våra bodar ständigt fyllda och att smidigt hantera kunderna och deras beställningar.\n' +
      'Så om du alltid har sett dig själv som lite av en Willy Wonka, eller åtminstone en Oompa Loompa,\n' +
      'så är Snaxeriet platsen för dig tillsammans med 250 andra karnevalister!',
      longTextEn: 'With equal parts common nonsense and sensational snacks, Snaxeriet is the section that allows\n' +
      'Karnevalists and visitors alike to survive Lundakarnevalen by keeping a steady supply of popcorn,\n' +
      'coffee and other snacks. And to do this, we need you!\n' +
      'During the spring we’ll be imagining and designing the concepts of our stalls, and then realizing\n' +
      'them with hammer & nail, brush & paint, needle & thread - you get it! During the carnival days it is\n' +
      'up to us to make sure that no one in Lundagård ever gets thirsty, peckish or deprived of caffeine.\n' +
      'So we’ll ensure that our stalls always are filled with delicious snacks and to sell these to the\n' +
      'visitors of Lundakarnevalen.\n' +
      'So if you have always seen yourself to be like Willy Wonka, or at least a bit like an Oompa Loompa,\n' +
      'then Snaxeriet is the place for you together with around 250 other Karnevalists!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Filmen',
      nameEn: 'Entertainment - The movie',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/filmen.png',
      textSv: 'I Filmen får du chansen att medverka i en filmproduktion! Med kärlek och imaginalitet skapar vi en 45 minuter lång film med urpremiär tidigt på karnevalsvåren. Filmen är ett av de stora nöjena och går på repeat under karnevalsdagarna. Hos oss kan du engagera dig i allt möjligt, från filmklippning till vieri. Inga förkunskaper krävs!',
      textEn: 'With us, you get to be a part of a film production where we produce a 45 minute long film – created with lots of love and creativity! Before Lundakarneval takes place we arrange a film premiere where we show the world the movie for the first time and celebrate. You can do a lot of different things with us, everything from film editing to organising parties, no previous experience needed!',
      longTextSv: 'Filmsektionen är ett av de Stora Nöjena i Lundakarnevalen och hos oss får du möjligheten att\n' +
      'beskåda en stor filmproduktion på nära håll. Vi skriver manus, tar fram kostymer och dekor – och\n' +
      'allt annat som behövs för att regissera och spela in en 45 minuter lång film. Någon vecka innan\n' +
      'Lundakarnevalen anordnar vi en glamourös filmpremiär där vi stolt visar upp vårt verk.\n' +
      'Vi är en av sektionerna som fick en hel del karnevalister redan innan uppropet då vårt arbete\n' +
      'behöver börja tidigt för att ha en färdig film till Lundakarnevalen. Hos oss kan du engagera dig\n' +
      'inom framförallt två områden: postproduktion och sexmästeriet. I postproduktionen är du med\n' +
      'och klipper filmen och sätter en personlig prägel på den, perfekt för dig som kan klippa film sedan\n' +
      'innan och har ett intresse av att bli ännu bättre på det. I sexmästeriet är du ansvarig för att\n' +
      'sektionen på ungefär 100 personer håller sig mätta och glada genom att skapa magi i köket. Om\n' +
      'du någonsin velat laga mat i lag och dessutom i mängder är det här du ska vara!',
      longTextEn: 'Filmen is one of the Entertainments at Lundakarnevalen and with us you are given the\n' +
      'opportunity to be part of a great film production. We write a script, produce costumes and decor\n' +
      'as well as everything else needed to direct and film a 45 minutes long movie. A week before\n' +
      'Lundakarnevalen, we arrange a glamorous movie premiere where we proudly present our piece\n' +
      'of art.\n' +
      'We are one of the sections which already consists of quite a few Karnevalists, since our work\n' +
      'needs to start early to have a finished movie before Lundakarnevalen. With us you can engage\n' +
      'yourself especially within two areas: post production and the festivities committee. In the post\n' +
      'production you get to edit the movie and put your personal touch into final product, perfect for\n' +
      'those of you who already know how to edit and want to get even better at it. In our sexmästeriet\n' +
      'you make sure that all of our almost 100 Karnevalists are getting fed and kept happy by creating\n' +
      'magic in the kitchen. If you ever dreamt of cooking food in teams and also in great amounts, this is\n' +
      'the place to be.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Revyn',
      nameEn: 'Entertainment - Revyn',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/nojen.png',
      textSv: 'Revyn är ett av Lundakarnevalens stora nöjen! Vi sätter upp en sketchbaserad imaginal föreställning. Som karnevalist i Revyn är det full rulle från från 13:e april till dess att Lundakarnevalens sista dag övergår till vanlig måndag. Hos oss kan du snickra, måla, sminka, sy, laga mat, planera fest, stå på scen, spela i band, fixa teknik - och framför allt nå toppen av karnevalistiskt trams!',
      textEn: 'Revyn is one of the big shows of Lundakarnevalen. We will do a sketch based imaginal show. Our working period is from the 13th of April until the end of the Karneval. Here you can build sets, paint, do make up, sew, cook, plan parties, perform on stage, play in the band, be in charge of light and sound, and above all be at the height of the academic silliness of Lund.',
      longTextSv: 'Revyn är ett av de åtta stora nöjena som ska underhålla våra besökare under karnevalshelgen.\n' +
      'Som ett nöje kommer vi att träffas intensivt under en månads tid, med start runt den 13 april, för\n' +
      'att tillsammans i olika syftesspecifika sektioner bygga, sy, laga mat, festplanera och annat för att vi\n' +
      'ska kunna bjuda karnevalsgästerna på en grym föreställning. Vi kommer från den 13 april och\n' +
      'framåt att husera i någon av Lunds härliga byggnader (läs: vi vet inte ännu, men nånstans blir det\n' +
      'och det blir gött!). Vår stora inflytt in på karnevalsområdet är en av de milstolpar våra\n' +
      'karnevalister kommer att få uppleva. Övriga milstolpar är kollationering, repperiod, Stora\n' +
      'Nöjesfesten, Stora Genrepsrundan och premiär!\n' +
      'I Revyn kommer vi att vara ca 90 karnevalister indelade i ett gäng olika sektioner (dekor, syet,\n' +
      'sminket, sexet, baren, scenen, orkestern, teknik, vieriet, säkerheten, ekonomi) som leds av\n' +
      'mellanchefer och viss mån ledningsgruppschefer.',
      longTextEn: 'Revyn is one of eight sections within the big entertainments that the visitors of Lundakarnevalen\n' +
      'can enjoy. It\'ll be a couple of intense days in May but before that we\'ll be gathering to prepare for\n' +
      'the shows in different ways. Some will build sets, do make up for the actors, and others will cook\n' +
      'or plan parties and a whole lot of other things. From the 13th of April we\'ll be having these\n' +
      'gatherings and they’ll be filled with fun and excitement as is in order when it\'s the spring of\n' +
      'Lundakarnevalen. Along the way until the premiere in the middle of May we\'ll be enjoying some\n' +
      'events and milestones like the the Big entertainment party and moving into Lundagård. It\'s the\n' +
      'place where we\'ll host our shows and hundreds of thousands can come and enjoy Revyn.\n' +
      'We’ll be around 90 happy Karnevalists in Revyn, which will be divided into lots of different teams\n' +
      '(Security, Set-building, Sewing, Makeup, Orchestra, Actors, Cooking, Party planning, Economics,\n' +
      'Sound and lighting, and The Bar), which each have different tasks, but we\'ll all work towards the\n' +
      'very same goal: producing an amazing show that reflects all the fun we\'ll have had for a month.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Cirkusen',
      nameEn: 'Entertainment - Cirkusen',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/nojen.png',
      textSv: 'Vi är Lundakarnevalens äldsta nöje och vi sätter upp en cirkusföreställning under karnevalsdagarna. Vår arbetsperiod kommer starta fem veckor innan karnevalen. Då ses vi söndag till fredag varje vecka och repar, bygger, syr och göttar! En unik chans att vara med och skapa en cirkus och få vänner för livet under din studietid!',
      textEn: 'We are Lundakarnevalens oldest amusement and we will create a wicked circus show during the carnival days. Our working period will start five weeks before Lundakarnevalen. We’ll rehearse Sunday through Friday, and build, sew, cook and much more. A unique chance to be a part of creating a circus and make friends for life during your time at Lund University.',
      longTextSv: 'Cirkusen, ett av åtta stora nöjen i Lundakarnevalen. Vi kommer tillsammans skapa en\n' +
      'cirkusföreställning som vi sätter upp cirka 20 gånger under karnevalsdagarna i ett cirkustält.\n' +
      'Cirkusen kommer arbeta intensivt i 5 veckor innan Lundakarnevalen, vår så kallade Nöjesmånad!\n' +
      'Du får räkna med att lägga ner 5 kvällar i veckan på jobb beroende på vilken sektion du är med i.\n' +
      'En kväll i veckan tar vi ledigt från arbetet. Då har vi fest tillsammans och taggar igång inför\n' +
      'karnevalsdagarna! Vi kommer som sagt att jobba hårt och intensivt men det kommer resultera i\n' +
      'att vi blir ett tajt gäng som kommer ha det jätteroligt under Lundakarnevalen 2018! Vi kommer\n' +
      'vara runt 95 karnevalister i cirkusen. De olika sektioner som finns inom cirkusen är följande:\n' +
      '* Dekoren kommer bygga dekoren och fixa rekvisitan i föreställningen.\n' +
      '* Området kommer skapa och bygga miljön runt cirkustältet för den väntande publiken\n' +
      '* Sexmästeri kommer vara hjältarna som lagar mat till hela sektionen under repveckorna\n' +
      'och karnevalsdagarna\n' +
      '* Syet kommer skapa alla finurliga kostymer som kommer synas i föreställningen\n' +
      '* Sminket kommer sminka skådespelarna\n' +
      '* Vieriet kommer skapa sammanhållning i Cirkusen under nöjesmånaden\n' +
      '* Baren kommer se till att det finns vatten och dryck till den törstige och festsugne\n' +
      '* Orkestern kommer spela musiken i föreställningarna\n' +
      '* Scenen kommer skådespela i föreställningarna\n' +
      '* Kommunikationsgruppen designar och jobbar med spons\n' +
      '* Tekniken håller koll på allt ljud och ljus under föreställningarna.\n' +
      'Om inte allt detta var nog att övertyga dig har vi även en bastuvagn till vårt förfogande under vår\n' +
      'Nöjesmånad!',
      longTextEn: 'Cirkusen is one of the eight big amusements at Lundakarnevalen. Together we’ll create a circus\n' +
      'performance which we’ll perform 20 times during the carnival days in a circus tent. We’ll work\n' +
      'mostly during our so called “amusement-month”, the 5 weeks prior to Lundakarnevalen!\n' +
      'Depending on which team you’ll join, you can count on working 5 evenings per week and having\n' +
      'one evening off which is the perfect possibility for us to get the carnival days started with a great\n' +
      'party! As said before, we will work hard and intensively but that will make us a great team that will\n' +
      'have the most fun during Lundakarnevalen 2018! We’ll be around 95 Karnevalists in Cirkusen.\n' +
      'The different teams in the circus are as following:\n' +
      '* Dekoren will create the decorations and fix props for the show\n' +
      '* Området will create and build the scenery around the circus tent for the waiting audience\n' +
      '* Sexmästeiret will be the heroes who’ll cook for the whole section during the rehearsal weeks\n' +
      'and carnival days\n' +
      '* Syet will sew and create all the costumes that will be seen in the show\n' +
      '* Sminket puts makeup on all the actors’ faces\n' +
      '* Vieriet will create a feeling of community during the “amusement-month”\n' +
      '* Baren will ensure that there is water and drinks for the thirsty Karnevalists and those ready to\n' +
      'dance\n' +
      '* Orkestern will play the music during our performances\n' +
      '* Scenen will be acting in the performances.\n' +
      '* The communication team will design and work with sponsors.\n' +
      '* Tekniken will keep track of all the sound and light during the performances.\n' +
      'If this wasn’t enough to convince you, we also have a sauna-wagon at our disposal during our\n' +
      '“amusement-month"!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Produkt - Blädderiet',
      nameEn: 'Product - Blädderiet',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/bladderiet.png',
      textSv: 'Gillar du lukten av papper? Är skrivande din grej? Du kanske är en mästare på att sälja? Bli en del av Blädderiet: vi skapar och säljar karnevalsbladet, barnboken, programbladet och mycket, mycket mer! Vi söker inspirerande personer som har ett öga för grafisk design, en stor foto- eller skrivarglädje eller en superspexig personlighet. Bli del av Blädderiet – bli en del av karnevalshistorien.',
      textEn: 'Do you like the smell of paper? Have any writing skills? Are you the master of sales? Become part of Blädderiet and help create and sell Lundakarnevalen’s magazine, children’s book, programme and much more! We need inspiring people with an eye for graphic design, a love for writing or photography, or just a fun personality! Join Blädderiet and become part of carnival history.\n',
      longTextSv: '',
      longTextEn: '',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Område - Tältnöjen',
      nameEn: 'Area - Tentertainments',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/omrade.png',
      textSv: 'Tältnöjessektionen sprider glädje genom 20 tält på karnevalsområdet. Här ryms allt från rullskridskodisko till matematiktävlingar och mycket mer. Med finess och humor planerar och arrangerar varje tältgrupp på 25 karnevalister varje tält så att besökarens upplevelse sent ska glömmas! Välkommen till oss och var med och bygg tälten som folk pratar om i många år framöver.',
      textEn: 'The Tentertainment section spreads joy with our 20 tents in Lundagård. Here everything from rollerblade disco to math competitions will take place. With finesse and humor, each tent team plans and arranges their tent so that the visitors get an experience they won’t soon forget. Join us in building the tents that will be talked about for many years to come.',
      longTextSv: 'Tältnöjessektionen arrangerar genom 20 tält runtom i Lundagård alla möjliga upplevelser mellan\n' +
      'himmel och jord. Målet är att roa både karnevalister och besökare!\n' +
      'Vad som arrangeras i år har korats utifrån en tävling som pågick fram till mitten av november.\n' +
      'På två sätt kan du vara karnevalist i Tältnöjessektionen:\n' +
      '* Vill man vara karnevalist i ett tält kommer man utifrån önskemål att tilldelas en tältidé och\n' +
      'bli en del av en tältgrupp. Som karnevalist i ett tält är det viktigaste att man har ett sinne\n' +
      'för humor, en attityd och vilja att i sann karnevalistisk anda genomföra tältarrangemangen\n' +
      'med ett leende på läpparna.\n' +
      '* Som karnevalist centralt inom tältnöjen kommer man att jobba med någon av de\n' +
      'stödjande staberna och hjälpa tältchefer och tältkarnevalister att arrangera tälten på\n' +
      'absolut bästa sätt. Det innefattar allt från att hjälpa till att bygga dekor, arrangera\n' +
      'tältfester till att jobba med sektionens administration.\n' +
      'Vi blir omkring 500-600 karnevalister som under våren tillsammans skapar tältnöjena genom att\n' +
      'planera, snickra, måla dekor, sy och sminka. Varmt välkomna!',
      longTextEn: 'The tentertainment section spreads joy with 20 tents scattered in Lundagård and creates all\n' +
      'different kinds of experiences. The aim is to entertain both Karnevalists and visitors!\n' +
      'What the tents will have to offer in May has been been carefully selected by a competition\n' +
      'committee. There are two ways to be a Karnevalist in the tentertainment section:\n' +
      '* If you want to be a Karnevalist in a tent, you’ll be allocated into a group after your\n' +
      'requests. As a Karnevalist in a tent, the most important thing is that you have a sense of\n' +
      'humor, an attitude and a willingness to carry out the tent arrangements with a smile on\n' +
      'your face in true spirit of Lundakarnevalen.\n' +
      '* As a Karnevalist in the central administration center, you will support tents and\n' +
      'Karnevalists to arrange the tents in the best way possible. This includes anything from\n' +
      'helping to decorate, arranging tent parties or working the section\'s administration.\n' +
      'In total we’ll be around 500 to 600 Karnevalists who’ll work all spring with creating\n' +
      'tentertainments by planning, carpentry, painting decor, sewing and doing makeup. Each tent will\n' +
      'be a group of around 20 to 25 Karnevalists. Join us!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Område - Lundagård',
      nameEn: 'Area - Lundagård',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/omrade.png',
      textSv: 'Sektionen Lundagård förvandlar vårt vardagliga Lundagård till en helt imaginal, karnevalistisk drömvärld! Med färg och ljus tar vi med besökarna till en plats de bara kunnat drömma om. Förutom att pimpa Lundagård är vi också den sektion som sköter områdets planering och logistik - allt från kartor och tält till renhållning och elförsörjning!',
      textEn: 'Lundagård will be transformed from an ordinary park into an imaginal dream world! With colour and lights we’ll create an atmosphere that visitors have only dreamt about. We’re also responsible for the logistics of the Lundakarneval area - we take care of everything from maps and tents to entrances and electricity.',
      longTextSv: 'Lundagårdssektionen förvandlar en lummig park i hjärtat av Lund till ett pulserande\n' +
      'karnevalsområde under tre imaginala drömdagar i maj! Vi bygger upp karnevalsområdet från\n' +
      'början till slut och ansvarar för allt mellan att kartor sätts upp till att dekorering och ljus skapar en\n' +
      'härlig inramning i Lundagård.\n' +
      'Vi kommer att ha karnevalister som hjälper till med allt från att bygga staket, tält och entréer till\n' +
      'att förse andra sektioner med el och nätverk. Redan nu finns ett tappert gäng kartkarnevalister på\n' +
      'plats som arbetar med att rita upp karnevalsområdet för att se till att världens bästa\n' +
      'Lundakarneval får plats rent fysiskt – och fler ska de bli! Deras grupp kommer även ansvara för all\n' +
      'logistik in och ut från karnevalsområdet. Lundagård jobbar också med Lundakarnevalens\n' +
      'övergripande miljöarbete och ska se till att göra den mest hållbara karnevalen någonsin!\n' +
      'Sektionens arbete utförs i huvudsak under våra byggdagar i början av maj. Under våren kommer\n' +
      'vårt vieri anordna festligheter för våra omkring 150 karnevalister. De ser till att vi blir ett riktigt\n' +
      'härligt gäng redan innan vi sätter igång med att lyfta, bära och hålla!\n' +
      'Vill du vara del av en sektion som…\n' +
      '* bygger 3 km staket?\n' +
      '* förser Lundakarnevalen med drygt 2500 Ampere ström?\n' +
      '* lyser upp karnevalsnatten med 2 km ljusslingor?\n' +
      '* hanterar hundratals transporter in och ut från området?\n' +
      '* lägger miltals med el- och nätverkskabel?\n' +
      '* ser till att tonvis med avfall kan återvinnas?\n' +
      'Då är Lundagård sektionen för dig!',
      longTextEn: 'The Lundagård section will transform a quiet park in the heart of Lund into an imaginal dream\n' +
      'world during three fantastic days in May! We are responsible for constructing the areas of\n' +
      'Lundakarnevalen, handling everything from maps to decorations and lights – and all things\n' +
      'imaginable in between!\n' +
      'Our Karnevalists will help with constructing fences and raising tents, as well as making sure other\n' +
      'sections have electricity and Internet at their disposal. We already have a team in place who is\n' +
      'mapping the areas of Lundakarnevalen and they are longing for company. Their group will also\n' +
      'handle transports and logistics to and from the areas. Apart from that, the Lundagård section also\n' +
      'handles Lundakarnevalen’s overall environmental work, making sure that this will be the most\n' +
      'sustainable Lundakarnevalen ever!\n' +
      'The Lundagård section works primarily during the first weeks of May, when it’s time for our\n' +
      'construction period. During the spring our Vieri will be keeping busy, planning festivities and\n' +
      'activities for our 150 Karnevalists. They will ensure that we are a close and friendly group of\n' +
      'friends well before we start building Lundakarnevalen from the ground up!\n' +
      'Do you want to be a part of a section that…\n' +
      '* constructs 3 kilometers of fencing?\n' +
      '* supplies Lundakarnevalen with 2500 Amperes of current?\n' +
      '* lights up the carnival nights with 2 kilometers of light strings?\n' +
      '* handles hundreds of transports to and from the areas?\n' +
      '* lays miles of electrical- and network cables?\n' +
      '* makes sure that tonnes of waste can be recycled?\n' +
      'Then Lundagård is the section for you!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Operan',
      nameEn: 'Entertainment - The opera',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/opera.png',
      textSv: 'Operan, ett nytt stornöje som Lundakarnevalen aldrig tidigare skådat, där musik och sång står i fokus under föreställningen. Men det är inte bara musik och sång som behövs för en imaginal föreställning utan även dekor, teknik, kläder, smink, mat och mycket mer, med en härlig gemenskap. Gå med i Operan och skapa karnevalistisk historia!',
      textEn: 'For the first time ever, Lundakarnevalen gives you: the Opera. A show filled with music and signing!  But, of course, that’s not all of it. For a show, as imaginal as possible, we design all of the props ourselves, all the while building a great sense of community. Join the Opera and make history in Lundakarnevalen!',
      longTextSv: 'Operan är ett nytt stornöje som Lundakarnevalen aldrig tidigare skådat där musik och sång står i\n' +
      'fokus. Men det är inte bara musik och sång som behövs för en imaginal föreställning utan även\n' +
      'dekor, teknik, kläder, smink, mat och så mycket mer. Här passar du som har en kreativ fallenhet\n' +
      'och en passion för musik och sång.\n' +
      'Vi kommer att ha en tidigare start än vissa andra sektioner men detta betyder endast mer kul för\n' +
      'oss! Vi kommer börja det roliga redan i mitten av april. Som sektion kommer vi bli ca 80-90\n' +
      'karnevalister, en blandning av artister, musiker, teater och opera-entusiaster med flera. Kläder\n' +
      'kommer behövas sys, dekor ska byggas, ljud och ljus ska justeras men främst av allt ska vi umgås\n' +
      'och ha trevligt! Känner du att just du passar in på denna beskrivningen? Eller är du en driven och\n' +
      'pepp människa som vill skapa karnevalistisk historia? Om ja, då bör du söka Operan!',
      longTextEn: 'For the first time ever, Lundakarnevalen gives you: Operan. A show filled with music and signing!\n' +
      'However, it\'s not just music that\'s needed to create an extraordinarily imaginary performance. A\n' +
      'creative decor and sewing section, a gifted technology crew, make-up, cooking team and so much\n' +
      'more is also imperative. If you have a creative touch and/or have a passion for music and song, this\n' +
      'is the section for you.\n' +
      'We will have an earlier start than some other sections but this only means more fun for us! For us,\n' +
      'the fun will begin by mid-April. As a section, we will be about 80-90 Karnevalists, a mix of artists,\n' +
      'musicians, theatre and opera enthusiasts. Clothes will need to be sewn, the decor is to be built,\n' +
      'sound and light to adjust and, above all, we will hang out and have a great time together. Do you\n' +
      'feel that you are a good fit for Operan or are you just a driven and enthusiastic person who wants\n' +
      'to create carnival history, this is the section for you!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Tåget - Fabriken',
      nameEn: 'The train - Fabriken',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/fabriken.png',
      textSv: 'Fabriken är en av tre sektioner som tillsammans utgör Lundakarnevalens hjärta, Karnevalståget. I Fabriken får du vara med och bokstavligen bygga och sy ihop den mest imaginala av Lundakarnevaler. På fabriksområdet bygger, syr och fixar vi tillsammans med andra sektioner till hela Lundakarnevalen. Vill du kunna peka på något och säga ”Det där, det har jag gjort”, då är Fabriken något för dig!',
      textEn: 'Fabriken is one of three sections that together constitutes the heart of Lundakarnevalen, the carnival parade. In Fabriken, you will literally build and sew up the most imaginal of carnivals. Fabriken creates things used in the entire carnival at our factory space. If you like pointing at something and say ”I created that”, then Fabriken is the right place for you!',
      longTextSv: 'Fabriken är sektionen som bokstavligen bygger och syr ihop karnevalen. Vi är en av de tre\n' +
      'sektionerna som tillsammans utgör Lundakarnevalens hjärta, Karnevalståget. Fabriken är en\n' +
      'mindre sektion på cirka 100 karnevalister, vilket gör att vi får alla de fördelar som en ”liten” grupp\n' +
      'ger med sammanhållning och vi-känsla. Samtidigt är vi en del av det stora Karnevalståget, det vill\n' +
      'säga mitt i smeten där allt händer.\n' +
      'Under april och maj bosätter sig Fabriken på ett tåg- och fabriksområde utanför Kemicentrum.\n' +
      'Utöver att själva bygga och sy allt som karnevalen kan tänkas behöva kan också andra sektioner\n' +
      'komma och jobba på vår fabriksyta. Vi lånar ut verktyg, beställer och levererar material och lagrar\n' +
      'sen allt imaginalt som skapats. Det gör att såväl banbrytande byggare och snitsiga syfantaster\n' +
      'som den som aldrig ens sett en spik och den som hellre vill hjälpa till att hålla i sociala aktiviteter\n' +
      'har en given plats i Fabriken.\n' +
      'Under själva Lundakarnevalen kommer vi vara klara med vårt arbete, vilket innebär att vi har\n' +
      'förmånen att tillsammans få njuta av den mest imaginala av Lundakarnevaler som vi varit med och\n' +
      'skapat.',
      longTextEn: 'Fabriken is the section that literally builds and sews up Lundakarnevalen. We are one of the three\n' +
      'sections that together constitutes the heart of Lundakarnevalen, the carnival parade. As one of\n' +
      'the smaller sections with around 100 Karnevalists, we have all the advantages of a “small” group\n' +
      'with a great team-feeling and on the same time, we’ll be right where the action is, by being a part\n' +
      'of the carnival parade.\n' +
      'During April and May Fabriken will have a factory space outside Kemicentrum where we and\n' +
      'other sections will build and sew all things needed for Lundakarnevalen. We will also lend out\n' +
      'tools, order and deliver material and then store all imaginal things that have been created until\n' +
      'they are needed during the carnival days. This means that Fabriken will need brilliant builders and\n' +
      'sensational sewing enthusiasts as well as those who have never even touched a hammer and\n' +
      'those who would rather like to organize our social activities.\n' +
      'During the carnival days, we’ll be free to enjoy the imaginal Lundakarnevalen that we have been a\n' +
      'part of creating!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Spexet',
      nameEn: 'Entertainment - The spex',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/nojen.png',
      textSv: 'Som Lundastudent får du INTE missa vare sig spex eller Lundakarneval. Slå ihop de tu och du får ett av Lundakarnevalens Stora Nöjen! Spexet växer fram under en månads reptid med götte och kulminerar i tre intensiva karnevalsdagar med föreställningar! Vi ska fylla Stora Salen i AF-borgen, vilket innebär att mängder med människor få se vad just DU har varit med och skapat!',
      textEn: 'Both spex and Lundakarnevalen are traditions that one must have been a part of during their studies in Lund, kill two birds with one stone by joining Spexet! During a month of rehearsals with lots of fun and three intense carnival days, you’ll be creating history in Lund! We’ll fill Stora Salen to the brim, lots of people will see what YOU have been a part of and created!',
      longTextSv: 'Spexet är ett av Lundakarnevalens åtta stora nöjen och har därför som uppgift att underhålla\n' +
      'besökarna på allra bästa vis! En fantastiskt kul uppgift, om vi får säga det själva. Vi sätter upp\n' +
      'ungefär 21 föreställningar i AF-borgens Stora sal under karnevalshelgen och kommer att bli\n' +
      'mellan 75 och 95 karnevalister som jobbar tätt ihop för att tillsammans skapa ett\n' +
      'skrattframkallande, unikt och nyskapande spex. Det ni!\n' +
      'Efter en månad av repande, byggande, göttande och knåpande inför den stora karnevalshelgen\n' +
      'kan du räkna med att vara en del av ett sammansvetsat spexgäng. Det vi kommer att syssla med\n' +
      'kan innefatta allt från att sminka våra scenisar och skapande av scendekor till att göra\n' +
      'programblad eller laga mat till hela gänget.\n' +
      'Spex är en studenttradition sedan drygt hundra år tillbaka med många skojiga traditioner och en\n' +
      'väldans massa teamwork. Spexet är din chans att vara en del i skapandet av nya traditioner och ny\n' +
      'historia. Något som varje student helt enkelt bör uppleva under sin tid i Lund!',
      longTextEn: 'Spexet is one of Lundakarnevalen’s eight big amusements, and our mission is to entertain the\n' +
      'visitors of Lundakarnevalen in the best way possible! What a fun and exciting task, if we may say\n' +
      'so. During the carnival days we’ll put up around 21 shows in the AF-building. Spexet will consist of\n' +
      '75 to 95 Karnevalists, who will all be working together to create an amusing, outstanding and\n' +
      'innovative spex. How about that!\n' +
      'After a month of rehearsing, building, painting, puzzling and of course a lot of “göttande” as we say\n' +
      'in swedish, you can count on being a part of a close spex-squad. The different duties can be\n' +
      'anything from building or painting the scene decor, doing the makeup on the actors, making the\n' +
      'programme leaflet or cooking food for the whole team.\n' +
      'Spex is a student tradition that goes back more than a hundred years, with a lot of fun traditions\n' +
      'and a whole lot of teamwork. Spexet is your chance to be a part of creating new traditions and\n' +
      'new history. Something that every student should experience during their time in Lund!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Tåget - Stationen',
      nameEn: 'The train - Stationen',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/stationen.png',
      textSv: 'Stationen är en av tre sektioner som tillsammans utgör Lundakarnevalens hjärta, Karnevalståget! Vi ser till att Tåget rullar som det ska, att det finns ett episkt tågområde där alla vagnar byggs och att peppen alltid är på topp. Gillar att planera events, laga mat, bygga eller sminka karnevalister så är Stationen något för dig. Vi lovar massa glädje och kreativitet oavsett arbetsuppgift!',
      textEn: 'Stationen is one of the three sections in the carnival parade. We ensure that the paraide runs smooth during Lundakarnevalen, that there’s an epic parade where all the carnival floats are built and keep the hype and energy high within the parade sections. Whether you like to plan events, cook, build or do makeup, join Stationen! We can promise lots of joy and creativity regardless of the task!',
      longTextSv: 'Stationen är en av tre sektioner i det fenomenala Karnevalståget. Det är vår uppgift att se till att\n' +
      'det finns ett episk tågområde där alla vagnar byggs, att tåget rullar bra och tryggt genom\n' +
      'staden under Lundakarnevalen och att vi har en sjuhelsikes gemenskap och pepp inom Tåget hela\n' +
      'tiden!\n' +
      'Vi kommer att bli ungefär 280 stycken glada Stationen-karnevalister och vi har förmånen, att\n' +
      'tillsammans med Vagnsektionen och Fabriken, ha ett helt eget tågområde att hålla till på\n' +
      'under april och maj. Hos oss finns det något kul att göra för de flesta. Är du\n' +
      'matlagningsintresserad passar du perfekt i vår Bistro som serverar mat på tågområdet,\n' +
      'tycker du om att sminka andra så behöver vi ett femtiotal karnevalister som kommer\n' +
      'förvandla de som går i tåget, är din passion att fixa events och se andra har riktigt kul så har\n' +
      'vi ett stort Vieri som gärna tar emot dig. Eller kanske tycker du att det är skitkul att bygga,\n' +
      'fixa och rigga? Då tar vår områdeschef emot dig med öppna armar!\n' +
      'Oavsett vill vi givetvis ha med dig i vår sektion! Vi kan lova massvis med gemenskap och\n' +
      'glädje. Häng med på tåget!',
      longTextEn: 'Stationen is one of the three sections in the amazing carnival parade. It’s our job to make sure\n' +
      'that there is an epic parade area where all the carnival floats are built, that the carnival parade\n' +
      'moves safely through the city and to create great memories for all Karnevalists within Stationen!\n' +
      'We will be around 280 happy Karnevalists within Stationen and we have the benefit, to have a\n' +
      'whole parade area all to ourselves and share it with the floats section and Fabriken during April\n' +
      'and May. There is something for everyone in our section. If you are interested in cooking you’ll be\n' +
      'perfect in our Bistro that serves food at the parade area, if you like to do makeup you can become\n' +
      'one of the 50 Karnevalists who’ll give a transformation to those who are a part of the parade, is\n' +
      'your passion to plan events and make sure everyone has good time we have a big Vieri that you\n' +
      'could be a part of. Or maybe you enjoy to build, set up and fix things? Then our area manager will\n' +
      'welcome you with open arms!\n' +
      'Regardless we would love for you to be a part of Stationen! We can promise lots of joy and\n' +
      'creativity regardless of the task. Join the parade!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Barnevalen',
      nameEn: 'Entertainment - Barnevalen',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/barnevalen.png',
      textSv: 'Barnevalens karnevalsområde är till för... gissa vilka? Alla barn! Vi ska skapa en föreställning som passar både stora och små samt hålla i ett café och några barnsligt roliga upplevelser i form av tältnöjen. Vår främsta arbetsperiod är månaden innan Lundakarnevalen. Då kommer vi ses och ha det gött tillsammans, men såklart också jobba och förbereda oss inför den bästa Barnevalen någonsin!',
      textEn: 'Barnevalen is an area for all the children visiting Lundakarnevalen! We’ll perform a show that suits both children and their parents. We’ll also run a café and a number of childish fun experiences in tents. We’ll be the most active the month before Lundakarnevalen. During this time we’ll hang out, have fun as well as work together to create the best Barneval ever!',
      longTextSv: 'Barnevalen är till för de allra yngsta karnevalsbesökarna. Vi kommer att ha ett eget område under\n' +
      'karnevalsdagarna och behöver många goa karnevalister för att få ihop allt, 130-150 stycken! Vi\n' +
      'ska skapa en föreställning, hålla i ett café och 4-5 barnsligt roliga upplevelser i form av tältnöjen.\n' +
      'Vi behöver dig som:\n' +
      '* Vill skapa vår föreställning genom att stå på eller bakom scenen! Ta fram din inre\n' +
      'teaterapa och var med och sjung, måla, bygg, sminka, teknika eller sy med oss!\n' +
      '* Vill skapa minnesvärda upplevelser i form av tältnöjen! Här får ni som håller i ett tält själva\n' +
      'påverka vad som händer. Glassregn? Bajskastning? Allt är möjligt!\n' +
      '* Vill driva Barnevalens egna café för att undvika blodsockerfall, koffeinsuktande föräldrar\n' +
      'och varmkorvsugna munnar! Vi behöver ett glatt gäng jobbare som kan överträffa caféets\n' +
      'succé för fyra år sedan.\n' +
      '* Vill vara med och fixa internfester och laga mat i Barnevalens egna Vieri! Allt för att göra\n' +
      'karnevalstiden så rolig som möjligt!\n' +
      'Vår främsta arbetsperiod kommer att vara månaden innan karnevalshelgen. Då kommer vi ses\n' +
      'och ha det gött tillsammans, men såklart också jobba och förbereda oss inför den bästa\n' +
      'Barnevalen någonsin!',
      longTextEn: 'Barnevalen creates a great experience for the youngest of Lundakarnevalen’s visitors. We’ll have\n' +
      'our own area during the carnival days and need lots of great Karnevalists to get everything up and\n' +
      'running. With around 130 to 150 Karnevalists we’ll perform a show, run a café and create 4 to 5\n' +
      'fun tentertainment experiences.\n' +
      'Join us if you want\n' +
      '* to create our show, on and off stage! Our show will be similar to a spex, so let your inner\n' +
      'entertainer out and sing (in Swedish), handle makeup or help to create the stage and all its\n' +
      'props!\n' +
      '* to create memorable experiences with small tentertainments! If you are managing one of\n' +
      'the tents, you’ll influence what’s happening here. Ice-cream rain? Throwing poop?\n' +
      'Anything is possible!\n' +
      '* to manage Barnevalen’s own café to avoid low blood sugar levels, satisfy caffeine craving\n' +
      'parents and fill empty tummies. We need a great bunch of people to top the success of the\n' +
      'café four years ago.\n' +
      '* to make this spring your most memorable by being a part of our vieri! This gang will create\n' +
      'the parties, cook food and make sure everyone in Barnevalen has a good time.\n' +
      'Our workload is mainly the month before the carnival days. During this time we’ll hang out and\n' +
      'have fun together and of course we’ll be planning and preparing the best Barnevalen ever',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Kabarén',
      nameEn: 'Entertainment - Kabarén',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/nojen.png',
      textSv: 'Vi är ett av de Stora Nöjena som håller till i Lundagård och har föreställningar i ett stort tält! Som kabarékarnevalist kommer du att ha det ganska lugnt fram till början av april, då vi kavlar upp ärmarna ordentligt och ses fyra till sex gånger i veckan fram till karnevalen. Vi gör allt från att bygga dekor, laga mat, sy kläder, sminka, stå på scen, hitta på trams och mycket mer!',
      textEn: 'We are one of the shows located outside in Lundagård and are performing in a big tent! As a Kabaré-Karnevalist, our work will start in the beginning of april when it\'s time to roll up our sleeves and get cranking four to six times a week until Lundakarnevalen begins. We do everything from building props, cooking, sewing costumes, do makeup, various mischief and much more!',
      longTextSv: 'Kabarén är ett av de stora nöjena i Lundakarnevalen som håller till i ett tält ute i Lundagård. Det\n' +
      'är en föreställning fylld med humor, trams och massa härlig musik. Skämten kommer hagla brett\n' +
      'och ofta och planen är att vi ska få tusentals besökare att skratta tillsammans. Så självklart vill vi ju\n' +
      'ha just dig till hjälp!\n' +
      'Som karnevalist hos oss så har en det ganska lugnt fram tills början på april. Därefter kavlar vi upp\n' +
      'ärmarna och sätter fart för att bygga, sy, preppa och fixa för att sätta upp en föreställning utan\n' +
      'dess like. Men att vara kabaré-karnevalist innebär mycket mer än bara jobb, vi måste ju självklart\n' +
      'fira hur duktiga vi är också! Detta gör vi med en massa fest och stoj som du som\n' +
      'kabaré-karnevalist sent kommer glömma! Vi räknar med att vara mellan 90-100 karnevalister\n' +
      'som alla kommer tillhöra olika grupper beroende på vad en vill göra. Du kanske gillar att laga mat,\n' +
      'sy eller pilla med teknik. Ja i Kabarén finns det plats för allt och alla och vi kan garantera dig att du\n' +
      'kommer ha en fantastisk vår hos oss!',
      longTextEn: 'Kabarén is one of the big shows at Lundakarnevalen which is performing in a big tent in\n' +
      'Lundagård. The show is filled with music and comedy which will amuse thousands of visitors, and\n' +
      'of course we want you to be the person to help us create this masterpiece!\n' +
      'As a Karnevalist in Kabarén you won’t have too many tasks to do until mid April when things start\n' +
      'to get real. From here on, we will start with building the scene, designing clothes, preparing and\n' +
      'rehearsing for the show. But being a Kabarén-karnevalist is not just work, every week we’ll\n' +
      'celebrate how good we are with plenty of parties and events (doesn’t it sound great!?). We’re\n' +
      'aiming to be around 90-100 Karnevalists, and everyone gets a specific job depending on what\n' +
      'they want to do. Maybe you like to design clothes, or build things, or work with the technical parts\n' +
      'such as audio and lights for the show? As you probably already noticed, there’s something for\n' +
      'everyone in Kabarén. We can guarantee you that you would have an awesome spring if you join\n' +
      'us!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Produkt - Drömmerian',
      nameEn: 'Product - The dreamery',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/drommerian.png',
      textSv: 'Drömmerian är den sektion som skapar och säljer det som lever kvar efter Lundakarnevalen 2018: Alla karnevalistiska prylar. KUL! Hos oss kan du göra allt från att kränga merch, styra fester eller skapa en helt egen pryl! Vi börjar på riktigt i slutet på mars då alla produkter anländer och för-försäljningen börjar. Därefter ska butikerna ordnas och 30 000 produkter säljas!',
      textEn: 'Drömmerian is the section that creates and sells what remains after Lundakarnevalen, all the karnevalistic merch. WOW! With us, you can do anything from working in the shop, arranging parties, or creating your own merch! The work truly begins in the end of March when all products arrive and the sale begins. After that, the shops will be organized and 30,000 products will be sold!',
      longTextSv: 'Drömmerian är en av de tre produktsektionerna i Lundakarnevalen, och det är vi som gör\n' +
      'drömmar till verklighet. Alltså, skapar och säljer alla karnevalistiska prylar!\n' +
      'Som karnevalist i Drömmerian kan man göra allt från att sälja i butikerna, köra lastbil eller styra\n' +
      'hejdundrande fester. Eller varför inte bara skapa en egen karnevalspryl som kan säljas i\n' +
      'butikerna? Arbetet hos oss börjar i slutet på mars när alla produkter anländer, därefter ska vi ha\n' +
      'en superfet lansering och modevisning i april som ingen vill missa! Sedan fortsätter arbetet in i\n' +
      'maj med förförsäljning och byggandet av butikerna som kommer vara vår del på\n' +
      'karnevalsområdet.\n' +
      'Inom vår sektion kommer vi bli ca 300 karnevalister som sprider karnevalistisk glädje genom våra\n' +
      'butiker. Som karnevalist kommer man ingå i ett litet team. Teamen gör allt tillsammans och\n' +
      'kommer bli riktigt härliga grupper med grym sammanhållning! Nya vänner utlovas.\n' +
      'Så gå ej miste om att vara med i gallerian som realiserar drömmar = Drömmerian!',
      longTextEn: 'Drömmerian is one of the three product sections at Lundakarnevalen, and we are the ones\n' +
      'making dreams come true. Namely, create and sell all karnivalistic items! Fun right?\n' +
      'As a carnivalist in Drömmerian, you can do anything from selling in the stores, driving a truck or\n' +
      'managing parties. Or why not just create your own karnevalistic item that can be sold in our\n' +
      'stores?\n' +
      'Our work starts at the end of March when all the products arrive, followed by an awesome launch\n' +
      'and fashion show in April that you don\'t want to miss! In May our work will continue with the\n' +
      'presale and construction of the stores that will be ours in Lundagård.\n' +
      'Within our section we’ll be about 300 Karnivalists who spread karnevalistic joy through our\n' +
      'stores. As a Karnevalist, you’ll be part of a small team. The teams do everything together and will\n' +
      'be lovely groups with great cohesion! New friends are guaranteed.\n' +
      'So don\'t miss out and join the section that realizes dreams = Drömmerian!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Vieriet',
      nameEn: 'Vieriet',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/Vieriet-01.png',
      textSv: 'Är du en glädjespridare av rang som kan kombinera nytta med trams? Vieriet skapar vi-känsla och gemenskap i hela Lundakarnevalen genom att arrangera stora som små interna evenemang och aktiviteter för alla karnevalister! Som Vierist får du göra nytta på flera olika sätt - den allra viktigaste är att sprida en härlig stämning och gó karnevalistisk glädje i hela karnevalen!',
      textEn: 'Vieriet strives to create a feeling of community within all of Lundakarnevalen. We arrange small and large events and activities for all the other karnevalists! Are you a ray of sunshine who enjoys antics and tomfoolery? The tasks vary from person to person - the most important one is the ability to spread happiness and karnevalistisk joy!\n',
      longTextSv: '',
      longTextEn: '',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Musiksektionen',
      nameEn: 'The music Section',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/musiken.png',
      textSv: 'Det är vi som tar hand om alla artister som gästar Lundakarnevalen och ser till att de har det bra. Dessutom bygger vi scener och sköter all annan underhållning på Stora Scenen i Lundagård. Om du älskar musik och tycker att häng i backstageområdet under Lundakarnevalen låter lockande är Musiksektionen rätt val för dig! Välkommen!',
      textEn: 'We are the Music section! We take care of all the artists that play at Lundakarnevalen and make sure they are comfortable. We also build stages and take care of all other entertainment on the big stage in Lundagård. If you love music and fancy hanging out in the backstage area during Lundakarnevalen, the Music section is the right choice for you! Welcome!',
      longTextSv: 'Vad vore en Lundakarneval utan musik?! Det är musiksektionen som ser till att Stora scenen\n' +
      'förgylls av fantastisk musik av ett flertal både etablerade och oetablerade artister/band under\n' +
      'hela karnevalshelgen. Musiksektionens medlemmar välkomnar artisterna och ser till att de får en\n' +
      'imaginalt fantastisk upplevelse i vårt mytomspunna backstage-område.\n' +
      'Under våren fokuserar musiksektionen på att lära känna varandra ordentlig och att bli bekväma i\n' +
      'våra arbetsuppgifter för att sedan under Lundakarnevalen låta planerna skrida till verket. Veckan\n' +
      'innan Lundakarnevalen möts vi för att bygga Stora scenen, inreda vårt backstage-område och\n' +
      'avslutar varje kväll med serverad middag från vårt alldeles egna sexmästeri. Under\n' +
      'karnevalsdagarna är de showtime i dubbel bemärkelse och kvällarna avslutas med sittningar\n' +
      'backstage.\n' +
      'Musiksektionen kommer bestå av ca 100 karnevalister med olika ansvarsområden som säkerhet,\n' +
      'logistik, sexmästeri, artisteri, vieri, kommunikation och bygg!',
      longTextEn: 'What would Lundakarnevalen be without music?! It rests in the hands of the music section to\n' +
      'make sure that the main stage hosts famous as well as less distinguished artists throughout the\n' +
      'carnival weekend. The section’s members welcome the artists and make sure that they receive a\n' +
      'magical experience in our mythical backstage area.\n' +
      'During the spring the section’s members focus on getting to know one another and on getting\n' +
      'familiar with their tasks. When Lundakarnevalen begins we let our plans become reality. The\n' +
      'section meets one week prior to Lundakarnevalen to construct the main stage as well as to\n' +
      'assemble, decorate and furnish the backstage area, and each day ends with a served dinner from\n' +
      'our very own pub. During the actual weekend of Lundakarnevalen it is showtime and each day\n' +
      'during the carnival weekend ends with a dinner backstage.\n' +
      'The music section will be around 100 Karnivalists divided into different teams, such as safety,\n' +
      'logistics, communication, entertainment, vieri, pub and construction!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Område - Tombolan',
      nameEn: 'Area - The tombola',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/omrade.png',
      textSv: 'Tombolan består av ett antal Tombola-bodar som innehåller unika varianter av spel och lotteri. Dessa spel och lotterier ska genomsyras av imaginalitet och studentikositet samtidigt som de ger Lundakarnevalens besökare någon form av upplevelse. Tombolan utmärker sig som sektionen där du som karnevalist får möjligheten att påverka besökarnas upplevelse då bodarnas koncept tas fram tillsammans.',
      textEn: 'Tombolan consists of a number of tombala booths with unique games and lotteries, all of which are inspired by imaginality and traditions from student life in Lund. The booths will give Lundakarnevalen’s visitors an exceptional experience! As a karnevalist in this section you have the opportunity to influence what will be remembered by the visitors. Together we design the concept of each booth! ',
      longTextSv: 'Tombolan är sektionen som säkerställer karnevalistisk galenskap genom att sätta upp\n' +
      'Tombola-bodar i Lundagård. Dessa bodar ska innehålla spel och lekar som genomsyras av\n' +
      'imaginalitet och studentikositet och ska - framförallt - ge besökarna någon form av upplevelse.\n' +
      'Tombolan består av ca 150 karnevalister som är engagerar sig dels i Tombola-bodarna och\n' +
      'Tombolans vieri, där Vieriet säkerställer att Tombolans karnevalister är gladast i stan. Tombolan\n' +
      'utmärker sig som sektionen där du får möjligheten att direkt påverka besökarnas upplevelse då\n' +
      'du som karnevalist är med i hela bod-processen, från det att bodar tas fram och konstrueras till\n' +
      'att alla får ta del av den Tombola-magi som skapas under Lundakarnevalen!',
      longTextEn: 'Tombolan creates a number of karnevalistic tombola booths which will be scattered around\n' +
      'Lundagård. The booths will have unique games and lotteries, all of which are inspired by\n' +
      'imaginality and traditions from student life in Lund. The booths will give Lundakarnevalen’s\n' +
      'visitors an exceptional experience!\n' +
      'As one of Tombolan’s 150 Karnevalist you have the opportunity to create the booths from\n' +
      'scratch and thereby can influence what really will be remembered by the visitors. Together we\n' +
      'design the concept of each booth! You can also be a part of our vieri and make sure that\n' +
      'Tombolan’s Karnevalists are the happiest in town.',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      nameSv: 'Nöje - Smånöjena',
      nameEn: 'Entertainment - Smånöjena',
      imageUrl: 'https://s3.eu-central-1.amazonaws.com/imaginalkarneval/images/nojen.png',
      textSv: 'Mitt i vimlet i Lundagård sätts det upp tre föreställningar i varsitt tält, interaktiva, annorlunda och väldigt spännande - Sketchofori, imTV och Mediamonster! Vi är unika, då vi är just tre smånöjen som samarbetar och har kul tillsammans redan långt innan karnevalshelgen. Var med och skapa en av dessa tre fantastiska produktioner',
      textEn: 'In the middle of the action in Lundagård, three interactive, different and exciting spectacles are set up: Sketchofori, imTV and Mediamonster! We are unique in being three smaller productions, working together closely, that start having fun long before the carnival weekend. Join us in creating one of these fantastic shows!',
      longTextSv: 'Mitt i vimlet i Lundagård så sätts det upp tre föreställningar, interaktiva, annorlunda och väldigt\n' +
      'spännande!\n' +
      '* Sketchofori! Morfin för själen i 30 minuter… Här tas vi igenom alla 5 steg av sorg i en\n' +
      'sketchförpackning, och vi går därifrån gladare än nånsin!\n' +
      '* imTV! I studio 3+i, precis mellan InAktuellt och Farmen-försnacket, hittar vi imTV, en\n' +
      'galen talkshow där tittarna kastas mellan tävlingar för publiken, inslag från utsidan och\n' +
      'en och annan anekdot från en karismatisk programledare. Samma tid, lika banalt!\n' +
      '* Mediamonster - Media sprider mer skräck än vad monster gör idag. Monstrerna befinner\n' +
      'sig i en existentiell kris, hur ska de ta sig ur denna?\n' +
      'I varje smånöje kommer vi vara ungefär 50 karnevalister som hjälper till med att sätta upp Lunds\n' +
      'tre roligaste produktioner i varsitt tält. Under veckorna som leder upp till Lundakarnevalen\n' +
      'bygger vi dekor, vi syr kläder, riggar teknik och sminkar ansikten (och annat?!). Vi lär känna nytt\n' +
      'folk från alla Lunds Universitets institutioner, kanter och hörn. Utöver det umgås och festar vi\n' +
      'tillsammans alla tre nöjen, redan långt innan karnevalshelgen går av stapeln! Var med och skapa\n' +
      'en av dessa tre fantastiska produktioner!',
      longTextEn: 'In the center of Lundagården’s happenings there’ll be three interactive, different and exciting\n' +
      'spectacles:\n' +
      '* Sketchofori: Morphine for the soul in 30 minutes… Here we are taken through all five\n' +
      'steps of grief in the form of sketches, and we leave happier than ever!\n' +
      '* imTV: In studio 3+i, just after InAktuellt and the pre-talk of Farmen, we find imTV, a crazy\n' +
      'talk show where the viewer gets to experience contests, news reports, and one or two\n' +
      'anecdotes from a charismatic talk show host!\n' +
      '* Mediamonster - Today media is spreading more fear than monsters… They find\n' +
      'themselves in an existential crisis, how will they manage?\n' +
      'In each “smånöje” (an awesome spectacle or show in a tent), we will be roughly 50 Karnevalists\n' +
      'who in a team effort will set up Lund’s three most fun productions. During the weeks that lead up\n' +
      'to the carnival days we’ll build decorations, sew costumes, rig light & sound, and apply make-up to\n' +
      'faces (and other places!?). We get to know new people from all different institutions of Lund\n' +
      'University. Apart from that, all three smånöjen will party and hang-out together long before the\n' +
      'actual weekend of Lundakarnevalen. Join us and create one of these three fantastic productions!',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {})
  }
}
