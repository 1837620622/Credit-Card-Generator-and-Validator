// ============================================================
// 身份信息生成器
// 生成各国虚拟身份信息
// ============================================================

// ------------------------------------------------------------
// 各国姓名数据库
// ------------------------------------------------------------
const NAMES_DATABASE = {
  india: {
    firstNames: { male: ['Aarav', 'Arjun', 'Vivaan', 'Aditya', 'Vihaan', 'Reyansh', 'Krishna', 'Sai', 'Arnav', 'Dhruv'], female: ['Aadhya', 'Saanvi', 'Aanya', 'Ananya', 'Pari', 'Diya', 'Myra', 'Sara', 'Ishita', 'Anvi'] },
    lastNames: ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Rao', 'Nair', 'Iyer', 'Verma', 'Joshi', 'Das', 'Mehta', 'Shah', 'Chopra']
  },
  usa: {
    firstNames: { male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Joseph', 'Charles', 'Thomas', 'Daniel'], female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'] },
    lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore']
  },
  uk: {
    firstNames: { male: ['Oliver', 'George', 'Harry', 'Noah', 'Jack', 'Leo', 'Arthur', 'Oscar', 'Charlie', 'Henry'], female: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Poppy', 'Ella', 'Lily'] },
    lastNames: ['Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Johnson', 'Roberts', 'Walker', 'Wright', 'Robinson', 'Thompson']
  },
  china: {
    firstNames: { male: ['Wei', 'Fang', 'Lei', 'Jun', 'Tao', 'Ming', 'Jian', 'Hao', 'Chao', 'Long'], female: ['Xiu', 'Ying', 'Na', 'Li', 'Fang', 'Mei', 'Juan', 'Yan', 'Min', 'Hui'] },
    lastNames: ['Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou', 'Xu', 'Sun', 'Ma', 'Zhu', 'Hu']
  },
  japan: {
    firstNames: { male: ['Haruto', 'Sota', 'Yuto', 'Haruki', 'Riku', 'Kaito', 'Asahi', 'Minato', 'Yuki', 'Ren'], female: ['Himari', 'Hina', 'Yua', 'Sakura', 'Ichika', 'Akari', 'Sara', 'Yui', 'Rio', 'Mio'] },
    lastNames: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato']
  },
  germany: {
    firstNames: { male: ['Ben', 'Paul', 'Leon', 'Finn', 'Elias', 'Jonas', 'Luis', 'Noah', 'Felix', 'Lukas'], female: ['Emma', 'Mia', 'Hannah', 'Sofia', 'Lina', 'Emilia', 'Anna', 'Marie', 'Lea', 'Lena'] },
    lastNames: ['Muller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann']
  },
  france: {
    firstNames: { male: ['Gabriel', 'Leo', 'Raphael', 'Louis', 'Lucas', 'Adam', 'Hugo', 'Jules', 'Arthur', 'Nathan'], female: ['Emma', 'Louise', 'Jade', 'Alice', 'Chloe', 'Lina', 'Lea', 'Rose', 'Anna', 'Mila'] },
    lastNames: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau']
  },
  canada: {
    firstNames: { male: ['Liam', 'Noah', 'Oliver', 'William', 'Benjamin', 'Lucas', 'Henry', 'Theodore', 'Jack', 'Leo'], female: ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Sophia', 'Ava', 'Mia', 'Isla', 'Evelyn', 'Luna'] },
    lastNames: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'Gagnon', 'Johnson', 'Taylor', 'Campbell']
  },
  australia: {
    firstNames: { male: ['Oliver', 'Noah', 'Jack', 'William', 'Leo', 'Henry', 'Charlie', 'Thomas', 'James', 'Oscar'], female: ['Charlotte', 'Olivia', 'Amelia', 'Isla', 'Mia', 'Ava', 'Grace', 'Willow', 'Harper', 'Chloe'] },
    lastNames: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson']
  },
  brazil: {
    firstNames: { male: ['Miguel', 'Arthur', 'Heitor', 'Bernardo', 'Theo', 'Davi', 'Gabriel', 'Samuel', 'Pedro', 'Lorenzo'], female: ['Helena', 'Alice', 'Laura', 'Maria', 'Valentina', 'Heloisa', 'Julia', 'Sofia', 'Lorena', 'Liz'] },
    lastNames: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes']
  },
  russia: {
    firstNames: { male: ['Alexander', 'Dmitry', 'Maxim', 'Ivan', 'Artem', 'Nikita', 'Mikhail', 'Daniil', 'Kirill', 'Andrei'], female: ['Anastasia', 'Maria', 'Anna', 'Victoria', 'Elizaveta', 'Polina', 'Daria', 'Sofia', 'Alisa', 'Ksenia'] },
    lastNames: ['Ivanov', 'Smirnov', 'Kuznetsov', 'Popov', 'Vasiliev', 'Petrov', 'Sokolov', 'Mikhailov', 'Fedorov', 'Morozov']
  },
  singapore: {
    firstNames: { male: ['Wei', 'Jun', 'Ming', 'Jian', 'Kai', 'Zhi', 'Yi', 'Hong', 'Hao', 'Xiang'], female: ['Hui', 'Mei', 'Ling', 'Xin', 'Yi', 'Jia', 'Min', 'Yan', 'Li', 'Na'] },
    lastNames: ['Tan', 'Lim', 'Lee', 'Ng', 'Wong', 'Goh', 'Chua', 'Ong', 'Koh', 'Teo']
  },
  korea: {
    firstNames: { male: ['Minho', 'Jimin', 'Junhyuk', 'Seojun', 'Juwon', 'Jihun', 'Minseo', 'Hajun', 'Siwoo', 'Dohyun'], female: ['Seoyeon', 'Soyoung', 'Jiwoo', 'Subin', 'Yuna', 'Eunbi', 'Minju', 'Hayeon', 'Soeun', 'Chaeyoung'] },
    lastNames: ['Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Kang', 'Cho', 'Yoon', 'Jang', 'Lim']
  },
  thailand: {
    firstNames: { male: ['Somchai', 'Somsak', 'Prasert', 'Sombat', 'Wichai', 'Thawatchai', 'Prayuth', 'Anon', 'Kittipong', 'Nattapong'], female: ['Somying', 'Malai', 'Nuanphan', 'Ratchanee', 'Supaporn', 'Wilai', 'Pranee', 'Siriporn', 'Nittaya', 'Siriwan'] },
    lastNames: ['Saetang', 'Srisawat', 'Channarong', 'Wongsuwan', 'Prasert', 'Chaiyasit', 'Thongchai', 'Rattana', 'Sriprom', 'Bunyasarn']
  },
  malaysia: {
    firstNames: { male: ['Ahmad', 'Muhammad', 'Mohd', 'Abdul', 'Hafiz', 'Amir', 'Faiz', 'Haziq', 'Irfan', 'Danish'], female: ['Nur', 'Siti', 'Nurul', 'Aisyah', 'Fatimah', 'Aminah', 'Zainab', 'Khadijah', 'Hajar', 'Maryam'] },
    lastNames: ['bin Abdullah', 'bin Ahmad', 'bin Ibrahim', 'bin Hassan', 'bin Ismail', 'binti Abdullah', 'binti Ahmad', 'bin Mohd', 'bin Ali', 'bin Omar']
  }
};

// ------------------------------------------------------------
// 各国地址数据库
// ------------------------------------------------------------
const ADDRESS_DATABASE = {
  india: { cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'], states: ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh'], streets: ['MG Road', 'Gandhi Nagar', 'Nehru Street', 'Patel Road', 'Station Road', 'Market Street', 'Temple Road', 'Park Lane'], zipFormat: '######', phonePrefix: '+91' },
  usa: { cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'], states: ['New York', 'California', 'Illinois', 'Texas', 'Arizona', 'Pennsylvania', 'Florida', 'Ohio', 'Georgia', 'North Carolina'], streets: ['Main Street', 'Oak Avenue', 'Maple Drive', 'Cedar Lane', 'Elm Street', 'Washington Blvd', 'Park Road', 'Lake Drive'], zipFormat: '#####', phonePrefix: '+1' },
  uk: { cities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff'], states: ['England', 'Scotland', 'Wales', 'Northern Ireland'], streets: ['High Street', 'Church Road', 'Station Road', 'Park Lane', 'Victoria Road', 'Queen Street', 'King Street', 'Mill Lane'], zipFormat: 'AA## #AA', phonePrefix: '+44' },
  china: { cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Wuhan', 'Xian', 'Nanjing', 'Tianjin'], states: ['Beijing', 'Shanghai', 'Guangdong', 'Sichuan', 'Zhejiang', 'Hubei', 'Jiangsu', 'Shaanxi'], streets: ['Jiefang Road', 'Renmin Road', 'Zhongshan Road', 'Nanjing Road', 'Beijing Road', 'Chang An Street'], zipFormat: '######', phonePrefix: '+86' },
  japan: { cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kawasaki', 'Sendai'], states: ['Tokyo', 'Osaka', 'Kyoto', 'Kanagawa', 'Aichi', 'Hokkaido', 'Fukuoka', 'Hyogo'], streets: ['Sakura-dori', 'Meiji-dori', 'Chuo-dori', 'Omotesando', 'Takeshita-dori', 'Kappabashi-dori'], zipFormat: '###-####', phonePrefix: '+81' },
  germany: { cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Dusseldorf', 'Leipzig', 'Dortmund', 'Essen'], states: ['Berlin', 'Bavaria', 'North Rhine-Westphalia', 'Baden-Wurttemberg', 'Lower Saxony', 'Hesse', 'Saxony'], streets: ['Hauptstrasse', 'Bahnhofstrasse', 'Berliner Strasse', 'Gartenstrasse', 'Schulstrasse', 'Dorfstrasse', 'Kirchstrasse'], zipFormat: '#####', phonePrefix: '+49' },
  france: { cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'], states: ['Ile-de-France', 'Provence-Alpes-Cote dAzur', 'Auvergne-Rhone-Alpes', 'Occitanie', 'Nouvelle-Aquitaine'], streets: ['Rue de la Paix', 'Avenue des Champs-Elysees', 'Boulevard Saint-Germain', 'Rue de Rivoli', 'Place de la Concorde'], zipFormat: '#####', phonePrefix: '+33' },
  canada: { cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Halifax'], states: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia'], streets: ['Yonge Street', 'King Street', 'Queen Street', 'Main Street', 'Maple Avenue', 'Oak Street', 'Pine Road'], zipFormat: 'A#A #A#', phonePrefix: '+1' },
  australia: { cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Hobart', 'Darwin'], states: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'ACT', 'Northern Territory'], streets: ['George Street', 'Collins Street', 'Queen Street', 'King Street', 'Elizabeth Street', 'Pitt Street'], zipFormat: '####', phonePrefix: '+61' },
  brazil: { cities: ['Sao Paulo', 'Rio de Janeiro', 'Brasilia', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'], states: ['Sao Paulo', 'Rio de Janeiro', 'Distrito Federal', 'Bahia', 'Ceara', 'Minas Gerais', 'Amazonas', 'Parana'], streets: ['Avenida Paulista', 'Rua Augusta', 'Avenida Brasil', 'Rua das Flores', 'Avenida Atlantica'], zipFormat: '#####-###', phonePrefix: '+55' },
  russia: { cities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod', 'Chelyabinsk', 'Samara', 'Omsk', 'Rostov-on-Don'], states: ['Moscow', 'Saint Petersburg', 'Novosibirsk Oblast', 'Sverdlovsk Oblast', 'Tatarstan'], streets: ['Tverskaya Street', 'Nevsky Prospekt', 'Arbat Street', 'Leninsky Prospekt', 'Kutuzovsky Prospekt'], zipFormat: '######', phonePrefix: '+7' },
  singapore: { cities: ['Singapore'], states: ['Singapore'], streets: ['Orchard Road', 'Marina Bay', 'Sentosa', 'Clarke Quay', 'Chinatown', 'Little India', 'Bugis Street', 'Boat Quay'], zipFormat: '######', phonePrefix: '+65' },
  korea: { cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam'], states: ['Seoul', 'Busan', 'Incheon', 'Gyeonggi-do', 'Gangwon-do', 'Chungcheong'], streets: ['Gangnam-daero', 'Teheran-ro', 'Sejong-daero', 'Jongno', 'Myeongdong-gil'], zipFormat: '#####', phonePrefix: '+82' },
  thailand: { cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hua Hin', 'Krabi', 'Koh Samui', 'Ayutthaya', 'Sukhothai', 'Nakhon Ratchasima'], states: ['Bangkok', 'Chiang Mai', 'Phuket', 'Chonburi', 'Prachuap Khiri Khan'], streets: ['Sukhumvit Road', 'Silom Road', 'Ratchadaphisek Road', 'Phaya Thai Road', 'Rama I Road'], zipFormat: '#####', phonePrefix: '+66' },
  malaysia: { cities: ['Kuala Lumpur', 'George Town', 'Johor Bahru', 'Ipoh', 'Shah Alam', 'Petaling Jaya', 'Kuching', 'Kota Kinabalu', 'Melaka', 'Alor Setar'], states: ['Selangor', 'Johor', 'Penang', 'Perak', 'Sarawak', 'Sabah', 'Kelantan', 'Pahang'], streets: ['Jalan Bukit Bintang', 'Jalan Ampang', 'Jalan Sultan Ismail', 'Jalan Tun Razak', 'Jalan Raja Chulan'], zipFormat: '#####', phonePrefix: '+60' }
};

// ------------------------------------------------------------
// 工具函数
// ------------------------------------------------------------
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateZip(format) {
  return format.replace(/#/g, () => randomInt(0, 9)).replace(/A/g, () => String.fromCharCode(65 + randomInt(0, 25)));
}

function generatePhone(prefix) {
  const digits = Array.from({ length: 10 }, () => randomInt(0, 9)).join('');
  return `${prefix} ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function generateBirthday() {
  const year = randomInt(1960, 2000);
  const month = randomInt(1, 12);
  const day = randomInt(1, 28);
  return { date: `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`, year, month, day };
}

function generateEmail(firstName, lastName) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'mail.com'];
  const num = randomInt(1, 999);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${num}@${randomItem(domains)}`;
}

function generateUsername(firstName) {
  const suffixes = ['123', '456', '789', '_pro', '_cool', '2024', '2025', '_x'];
  return firstName.toLowerCase() + randomItem(suffixes);
}

function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  return Array.from({ length: 12 }, () => chars[randomInt(0, chars.length - 1)]).join('');
}

// ------------------------------------------------------------
// 生成完整身份信息
// ------------------------------------------------------------
export function generateIdentity(country = 'usa') {
  const namesData = NAMES_DATABASE[country] || NAMES_DATABASE.usa;
  const addressData = ADDRESS_DATABASE[country] || ADDRESS_DATABASE.usa;
  
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = randomItem(namesData.firstNames[gender]);
  const lastName = randomItem(namesData.lastNames);
  const birthday = generateBirthday();
  const city = randomItem(addressData.cities);
  const state = randomItem(addressData.states);
  const street = randomItem(addressData.streets);
  const streetNum = randomInt(1, 999);

  return {
    fullName: `${firstName} ${lastName}`,
    firstName,
    lastName,
    gender,
    title: gender === 'male' ? 'Mr.' : 'Ms.',
    birthday: birthday.date,
    age: new Date().getFullYear() - birthday.year,
    address: {
      street: `${streetNum} ${street}`,
      city,
      state,
      zipCode: generateZip(addressData.zipFormat),
      country: country.charAt(0).toUpperCase() + country.slice(1)
    },
    phone: generatePhone(addressData.phonePrefix),
    email: generateEmail(firstName, lastName),
    username: generateUsername(firstName),
    password: generatePassword(),
    height: `${randomInt(155, 190)} cm`,
    weight: `${randomInt(50, 90)} kg`
  };
}

// ------------------------------------------------------------
// 获取支持的国家列表
// ------------------------------------------------------------
export function getSupportedCountries() {
  return Object.entries(NAMES_DATABASE).map(([key]) => ({
    code: key,
    name: ADDRESS_DATABASE[key]?.cities[0] ? key.charAt(0).toUpperCase() + key.slice(1) : key
  }));
}
