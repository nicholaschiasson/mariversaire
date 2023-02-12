const PASSAGES = [
	"A bad workman blames his tools.",
	"A bird doesn't sing because it has an answer, it sings because it has a song.",
	"A bird in the hand is worth two in the bush.",
	"A cat has nine lives.",
	"A chain is only as strong as its weakest link.",
	"A change is as good as a rest.",
	"A diamond is forever.",
	"A dog is a man's best friend.",
	"A dog is for life, not just for Christmas.",
	"A drowning man will clutch at a straw.",
	"A friend in need is a friend indeed.",
	"A friend to all is a friend to none.",
	"A good beginning makes a good ending.",
	"A hard nut to crack.",
	"A house divided against itself cannot stand.",
	"A knight in shining armor.",
	"A leopard can't change its spots.",
	"A life of luxury.",
	"A little bird told me.",
	"A little knowledge is a dangerous thing.",
	"A penny for your thoughts.",
	"A penny saved is a penny earned.",
	"A picture is worth a thousand words.",
	"A picture paints a thousand words.",
	"A problem shared is a problem halved.",
	"A rainbow after the rain.",
	"A rising tide lifts all boats.",
	"A rolling stone gathers no moss.",
	"A saint in the making.",
	"A stitch in time saves nine.",
	"A tree doesn't make a forest.",
	"Absence makes the heart grow fonder.",
	"Actions speak louder than words.",
	"An apple a day keeps the doctor away.",
	"An ounce of prevention is worth a pound of cure.",
	"Behind every great man, there's a great woman.",
	"Better late than never.",
	"Curiosity killed the cat.",
	"Don't bite the hand that feeds you.",
	"Don't put all your eggs in one basket.",
	"Easy come, easy go.",
	"Every cloud has a silver lining.",
	"Life is like a box of chocolates, you never know what you're going to get.",
	"One man's meat is another man's poison.",
	"The Amazon rainforest is home to an incredibly diverse array of plant and animal species, many of which are found nowhere else on Earth.",
	"The best defense is a good offense.",
	"The best things in life are free.",
	"The Big Bang Theory is the prevailing scientific explanation for the origin of the universe, which states that the universe began as a singularity and expanded over time.",
	"The Big Dipper is a well known asterism, or recognizable pattern of stars, that is part of the constellation Ursa Major.",
	"The bird flew over the ocean, admiring the endless beauty below. Suddenly, a gust of wind caught it by surprise. The bird struggled to stay aloft.",
	"The boy stood at the edge of the cliff, the wind blowing his hair. He closed his eyes and took a deep breath, then dove into the water below.",
	"The car spun out of control, hitting the guardrail and flipping over. He closed his eyes, waiting for the end. But when he opened them again, he found himself sitting on the side of the road, unharmed. He looked around, confused, before realizing that a stranger had pulled him from the wreckage and saved his life.",
	"The cat sat on the windowsill, watching the rain fall. It purred softly, content to stay inside and stay dry.",
	"The circulatory system is a network of blood vessels and heart that transport oxygen and nutrients to all parts of the body and remove waste products.",
	"The clock chimed, signaling the start of the day. She rose, stretching her limbs, ready to face whatever may come.",
	"The clock struck midnight and the witch cackled with glee. Her spell was complete, causing chaos in the land. The kingdom would never be the same.",
	"The clock ticked, marking the passing of time. She sat at her desk, staring at the endless to do list before her.",
	"The concept of entropy, which describes the tendency for systems to move towards a state of greater disorder, is a fundamental principle in physics and thermodynamics.",
	"The concept of the atom was first proposed by ancient Greek philosophers and is the building block of all matter in the universe.",
	"The concept of the black hole was first proposed by physicist John Michell in the eighteenth century and has since been confirmed by numerous observations and experiments.",
	"The concept of the gene was first described by Danish botanist Wilhelm Johannsen in the early twentieth century and",
	"The concept of the hormone was first described by Dutch physiologist Henry Dale in the early twentieth century and refers to chemical messengers produced by the body to regulate various physiological processes.",
	"The concept of zero was invented by ancient Indian mathematicians and is a fundamental idea in mathematics and science.",
	"The digestive system is a complex network of organs and tissues that work together to break down food, absorb nutrients, and eliminate waste.",
	"The DNA molecule is the genetic material that encodes all of the information necessary for the growth, development, and function of all living organisms.",
	"The dog barked, chasing after the squirrel up the tree. The squirrel scolded it, chattering loudly before darting away.",
	"The door creaked open, revealing a room filled with treasure. He stepped inside, his heart racing with excitement. He smiled, knowing that he had finally found what he had been searching for.",
	"The early bird catches the worm.",
	"The Eiffel Tower is an iconic structure located in Paris, France, that is considered one of the most recognizable landmarks in the world.",
	"The fire burned, consuming everything in its path. She stood, watching it all go up in flames. And yet, she felt no sadness, only a sense of peace, knowing that everything she had lost was now being transformed into something new.",
	"The fire crackled, filling the room with warmth and light. He sat beside it, lost in thought, as the night slowly passed by.",
	"The flowers bloomed, filling the air with their sweet scent. Bees buzzed, gathering nectar and pollen to take back to the hive.",
	"The Galapagos Islands are a group of volcanic islands located off the coast of Ecuador that are known for their unique and diverse ecosystem.",
	"The Grand Canyon is a natural wonder that showcases the power and beauty of nature, with its vast depth and breathtaking views.",
	"The grass is always greener on the other side.",
	"The Great Barrier Reef is one of the most spectacular natural wonders of the world, with its vibrant coral formations, sea creatures and diverse ecosystem.",
	"The Great Pyramids of Giza are ancient structures located in Egypt that have stood the test of time, and are still a source of mystery and wonder.",
	"The Himalayas are the highest mountain range in the world, and are known for their stunning beauty, rugged terrain and rich cultural heritage.",
	"The human brain is one of the most complex structures in the universe, and is responsible for our ability to think, feel, and perceive the world around us.",
	"The human ear is a complex organ that allows us to hear sounds from the environment by detecting vibrations in the air.",
	"The human eye is a complex organ that allows us to see by capturing and processing light from the environment.",
	"The human foot is a complex organ that allows us to stand, walk, and run by providing support and stability to the body.",
	"The human hand is a complex organ that allows us to manipulate and interact with objects in our environment through a combination of strength, dexterity, and sensitivity.",
	"The human nose is a complex organ that allows us to smell by detecting chemicals in the air and transmitting this information to the brain.",
	"The human skeleton is made up of two hundred and six bones and provides structure, support, and protection for the body.",
	"The immune system is a complex network of cells, tissues, and organs that work together to protect the body from disease and infection.",
	"The Industrial Revolution was a period of rapid industrialization that began in Britain in the late eighteenth century and had a profound impact on the world.",
	"The laws of electricity and magnetism were described by physicist James Clerk Maxwell in the nineteenth century and form the basis of our understanding of electricity and magnetism.",
	"The laws of fluid dynamics describe the behavior of fluids, such as liquids and gases, and their interactions with solid objects and boundaries.",
	"The laws of motion were described by Sir Isaac Newton and explain how objects move and interact in the physical world.",
	"The laws of thermodynamics are fundamental principles that govern the behavior of energy and matter in the universe.",
	"The leaves rustled in the wind, their bright colors painting the sky. She walked, her steps light and easy, and felt at peace. She breathed in the crisp air, feeling a sense of freedom that she had never felt before.",
	"The little girl sat by the lake, throwing pebbles into the water. Each one made a satisfying plop, echoing across the still surface.",
	"The Mona Lisa is a painting by Leonardo da Vinci that is widely considered one of the most famous and enigmatic works of art in the world.",
	"The moon rose, casting a silver light over the land. She walked through the forest, her feet barely making a sound.",
	"The moon waned, its light dimming as it shrank away. She looked up at it, feeling small and insignificant in the vastness of the universe.",
	"The music filled the room, its rhythm pulsing through her veins. She danced, her feet moving to the beat, and felt alive. She smiled, knowing that she was where she was meant to be.",
	"The nervous system is a complex network of cells and tissues that transmits information throughout the body, allowing us to sense and respond to our environment.",
	"The Northern Lights, also known as the Aurora Borealis, is a natural phenomenon caused by the interaction of charged particles from the sun with the Earth's atmosphere.",
	"The old man sat on his front porch, sipping iced tea and watching the world go by. He saw children playing in the park, couples walking hand in hand, and dogs chasing balls. He smiled, knowing that life was good, and that he was content to just sit and watch.",
	"The old man sat on his porch, his hands shaking with age. He closed his eyes and remembered the young man he once was, full of life.",
	"The periodic table of elements is a chart that organizes all of the known elements in the universe based on their atomic structure.",
	"The proof of the pudding is in the eating.",
	"The quick brown fox jumps over the lazy dog.",
	"The rain poured down, but she didn't mind. She walked, her feet sinking into the soft earth, her hair getting soaked. She looked up at the sky, feeling the rain on her face, and smiled.",
	"The Renaissance was a cultural movement that began in Italy in the fourteenth century and marked a period of great artistic and scientific advancement.",
	"The respiratory system is a series of organs and tissues that work together to bring oxygen into the body and remove carbon dioxide.",
	"The Roman Colosseum is an ancient amphitheater located in Rome, Italy, that was once used for gladiatorial contests and other public spectacles.",
	"The sky was clear, the stars shining bright. He lay on his back, feeling the cool grass against his skin, and thought about the mysteries of the universe. He smiled, knowing that there was so much out there waiting to be discovered.",
	"The snow fell, blanketing the world in a soft white cloak. She walked through it, feeling the crunch of snow beneath her boots.",
	"The snowflakes danced in the air, their delicate beauty taking her breath away. She stood, watching them fall, and felt a sense of wonder. She smiled, knowing that there was magic in the world, if only she looked for it.",
	"The solar system is composed of the sun and the objects that orbit around it, including planets, moons, asteroids, and comets.",
	"The soldier lay on the battlefield, his life slipping away. He thought of his family and all he would miss, then closed his eyes for the last time.",
	"The sun rose, its golden light filling the sky. He watched, feeling the warmth on his skin, and knew that he was where he was meant to be. He smiled, knowing that he had finally found a place to call home.",
	"The sun rose, lighting up the sky with its warm glow. She stepped out of the house, feeling alive. A new day was waiting for her.",
	"The sun set, painting the sky with shades of orange and pink. She watched, mesmerized, as the stars came out one by one.",
	"The sun was setting as she walked down the beach, memories of their time together flooding back. She paused, taking one last look at the place where they first met. She smiled, knowing that no matter where life takes her, she'll always cherish the moments they shared.",
	"The Taj Mahal is a white marble mausoleum located in Agra, India, that is considered one of the greatest examples of Mughal architecture.",
	"The theories of quantum mechanics and quantum field theory are fundamental theories in physics that describe the behavior of matter and energy at a subatomic scale.",
	"The theory of continental drift, which holds that the Earth's continents have moved and shifted over time, was first proposed by German geophysicist Alfred Wegener in the early twentieth century.",
	"The theory of evolution by natural selection was further developed by geneticist Gregor Mendel in the nineteenth century and forms the basis of our understanding of evolution and genetics.",
	"The theory of evolution by natural selection was proposed by Charles Darwin and is widely accepted as the explanation for the diversity of life on Earth.",
	"The theory of geocentrism, which held that the Earth was the center of the universe, was challenged by the theory of heliocentrism, which held that the sun was the center of the universe.",
	"The theory of plate tectonics explains how the Earth's surface is made up of large plates that move and interact, causing earthquakes and volcanic eruptions.",
	"The theory of relativity was proposed by Albert Einstein and is a fundamental theory of physics that describes the relationship between space and time.",
	"The train chugged along, taking him further and further from the only home he had ever known. He sat by the window, watching the world go by, and wondered if he would ever find what he was looking for.",
	"The train chugged down the tracks, its whistle blowing loudly. Passengers leaned out the windows, taking in the passing scenery.",
	"The Victoria Falls is a breathtaking natural wonder located on the border between Zambia and Zimbabwe, and is one of the largest waterfalls in the world.",
	"The waves crashed against the shore, the sound of the sea soothing. She lay on the beach, letting the sun warm her skin.",
	"The waves crashed against the shore, their rhythmic sound soothing her soul. She walked, her feet sinking into the sand, and felt at peace. She looked out at the ocean, and knew that she could face anything with its strength by her side.",
	"The wind blew, rustling the leaves of the trees. He stood still, letting the cool air wash over him, refreshing his soul.",
	"The wind howled, its icy breath cutting through the night. He shivered, pulling his coat tighter around him. But he smiled, knowing that he was exactly where he wanted to be.",
	"The wolf howled at the moon, its lonely voice echoing through the forest. In the distance, a pack answered, calling it home.",
	"There's no place like home.",
	"There's no smoke without fire.",
	"Time flies when you're having fun.",
	"When in Rome, do as the Romans do.",
	"You can lead a horse to water, but you can't make it drink.",
	"You can't have too much of a good thing.",
	"You can't have your cake and eat it too.",
	"You can't judge a book by its cover.",
	"You can't make a silk purse out of a sow's ear.",
	"You can't make an omelette without breaking eggs."
];
