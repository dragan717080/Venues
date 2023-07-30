// Instant image links for famous cities, so user doesn't have to search manually for them
import { StringObject } from "@/app/interfaces/types"
import { FamousCity } from "@/app/interfaces/City"

const famousCities: FamousCity[] = [
    {
        ascii_name: 'Tokyo',
        img: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg',
        year_founded: '1457',
        description: "Tokyo, the bustling capital of Japan, is a mesmerizing blend of ancient traditions and cutting-edge modernity. From ancient temples to karaoke bars, tranquil gardens to bustling marketplaces, it presents a kaleidoscope of experiences.",
    },
    {
        ascii_name: 'New York City',
        img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg',
        year_founded: '1624',
        description: "New York City is a major global city known for its diverse culture and iconic landmarks. Its energy is palpable day and night, with its bustling streets, 24/7 nightlife, and a sense of endless possibilities.",
    },
    {
        ascii_name: 'London',
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/67/London_Skyline_%28125508655%29.jpeg',
        year_founded: '43',
        description: "London is a vibrant and diverse metropolis. It is renowned for its theaters, art galleries, and music scene, making it a hub for entertainment and creativity. London's historical neighborhoods, like Covent Garden and Notting Hill, add to its unique charm.",
    },
    {
        ascii_name: 'Paris',
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/The_Eiffel_Tower%2C_viewed_from_Tour_Montparnasse%2C_25_July_2022_%28cropped%29.jpg',
        year_founded: '52',
        description: "Paris, the City of Light, is a timeless masterpiece and a global center of art, fashion, and culture. It has captivating romantic ambiance, iconic landmarks, artistic heritage and timeless allure.",
    },
    {
        ascii_name: 'Stockholm',
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Stockholms_Stadshuset_City_Hall_Stockholm_2016_01.jpg',
        year_founded: '1252',
        description: "Stockholm is a city of stunning beauty, where history seamlessly blends with modernity. Built on 14 islands connected by bridges, Stockholm is often referred to as the 'Venice of the North' for its scenic waterfronts, charming canals, and lush greenery.",
    },
    {
        ascii_name: 'Dubai',
        img: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg',
        year_founded: '1833',
        description: "A dazzling oasis in the desert, Dubai is a city of awe-inspiring modernity and boundless ambition. Situated in the United Arab Emirates, Dubai has risen from humble beginnings to become a global metropolis renowned for its futuristic architecture, opulent lifestyle, and world-class attractions.",
    },
    {
        ascii_name: 'Rome',
        img: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Rome_Skyline_%288012016319%29_%28cropped%29.jpg',
        year_founded: '753 BC',
        description: "Rome, the Eternal City, holds a captivating allure with its timeless beauty, rich history, and cultural significance. It stands as a living testament to the glory of ancient civilizations and their enduring impact on the modern world.",
    },
    {
        ascii_name: 'Beijing',
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Skyline_of_Beijing_CBD_from_the_southeast_%2820210907094201%29.jpg',
        year_founded: '1045 BC',
        description: "Beijing has been a political, cultural, and economic center for over three millennia. The city is adorned with iconic landmarks, a testament to its ancient glory. Its continuous growth and transformation showcase China's ambition and dynamism on the world stage.",
    },
    {
        ascii_name: 'Manchester',
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Bridgewater_Canal%2C_Castlefield_Basin_%28geograph_6966336%29.jpg',
        year_founded: '79 AD',
        description: "Manchester is a city in the northwest of England known for its industrial heritage and vibrant music scene. As an industrial powerhouse during the Industrial Revolution, Manchester's legacy as a dynamic and forward-thinking city continues to shine today.",
    },
    {
        ascii_name: 'Los Angeles',
        img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Hollywood_sign_%288485145044%29.jpg',
        year_founded: '1781',
        description: "Renowned as the entertainment capital of the world, Los Angeles exudes a unique blend of glitz, glamour, and laid-back charm that has captivated people from all walks of life. Its numerous museums and galleries celebrate contemporary art and culture.",
    },
    {
        ascii_name: 'Sydney',
        img: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg',
        year_founded: '1788',
        description: "Sydney, the stunning harbor city in Australia, is a vibrant metropolis that combines a breathtaking natural landscape with a thriving urban scene. As the largest and most populous city in Australia, Sydney is an international hub of culture, commerce, and tourism.",
    },
    {
        ascii_name: 'Cairo',
        img: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Cairo_at_night_..jpg',
        year_founded: '969 AD',
        description: "Cairo is one of the oldest cities in the world steeped in history and teeming with vibrant energy. Situated on the banks of the Nile River, Cairo is a captivating blend of ancient wonders and bustling modernity. It provides a window into Egypt's illustrious past.",
    },
];

export default famousCities;
