import { prismaDB } from "~/modules/.servers/db.server";

console.log('🌱 Seeding the database...');
const start = performance.now();

/* CUSTOMERS SEED */
Promise.all([
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
    }
].map(customer => prismaDB.customer.create({ data: customer })))

/* CATEGORIES SEED */
Promise.all([
    { name: 'Living Room' },
    { name: 'Kitchen' },
    { name: 'Office' },
    { name: 'Shop' },
    { name: 'Kids' },
].map(cat => prismaDB.category.create({ data: cat })))

/* PRODUCT SEED */
Promise.all(
    [
    // 1
    {
        sku: 'BED-KIDS-8F785-M',
        name: 'Bean Bag Chairs Furniture Foot Rests Terapy', desc: 'Bean Bag Chairs Furniture Foot Rests Terapy, Kids with bag, blue, leather, stool',
        category: 'Kids',
        color: 'Lemon Green',
        material: 'leather and form',
        feature: '8f7852641d0e6828b2a363e0b088836a5.avif',
        tag: 'Bean Bag Chairs, Foot Rests, Terapy, Kids with bag, blue, leather, stool'
    },
    // 2
    {
        sku: 'BED-KIDS-DF15D-L',
        name: 'Bunk bed Furniture',
        category: 'Kids',
        material: 'Wood',
        color: 'Pink',
        desc: 'Bunk Wood Bed',
        feature: 'df15d73a17c4b84f3b45f8fbe4742df88.avif',
        tag: 'Bunk bed, kids bed, angle, mattress'
    },
    // 3
    {
        sku: 'BED-KIDS-6F10D-M',
        name: 'Bunk bed Pottery Barn Kids',
        category: 'Kids',
        material: 'Wood',
        color: 'Light Gray',
        feature: '6f10d7f4fb1f8f48f10c35ea002a81e1d.avif',
        desc: 'Bunk bed Pottery Barn for kids use in bedroom',
        tag: 'Bunk bed, Pottery Barn Kids.Bedroom, 3D furniture models, celebrities, angle, mattress'
    },
    // 4
    {
        sku: 'BED-KIDS-52AC2-S',
        name: 'Pow Seat',
        color: 'Blue',
        category: 'Kids',
        material: 'Plastic',
        desc: 'A Pow seat for kids',
        feature: '52ac2eef7608368acdef20141435c170c.avif',
        tag: 'Kids, Seat, Room, small, plastic'
    },
    // 5
    {
        sku: 'TABLE-KITCHEN-07845-M',
        name: 'Garden Table',
        color: 'Dark Brown',
        material: 'Wood',
        category: 'Kitchen',
        feature: '07845ce45e7dc73e3a6423f8263e5f082.avif',
        desc: 'Garden Table Bench with 4 Chairs, could be use for dining table',
        tag: 'Table, Bench, Garden furniture, dining table, angle, furniture, rectangle'
    },
    // 6
    {
        sku: 'TABLE-KITCHEN-024B7-S',
        name: ' Loft Dining Table',
        color: 'Brown',
        material: 'Wood',
        category: 'Kitchen',
        feature: '024b7bed61f2e050afb547c7812c87fde.avif',
        desc: 'A Loft Table for Dining room chair',
        tag: 'Table, Loft, Dining room, Chair, angle, furniture, room'
    },
    // 7
    {
        sku: 'TABLE-KITCHEN-7B56F-M',
        name: 'Nightstand Table',
        color: 'Brown',
        material: 'Wood',
        category: 'Kitchen',
        feature: '7b56f34f8c8e2a803c5bd31f5b01be7bb.avif',
        desc: 'Nightstand Table',
        tag: 'Table, Nightstand Table, angle, furniture, rectangle'
    },
    // 8
    {
        sku: 'TABLE-KITCHEN-0FB6A-L',
        name: 'Conference Table',
        color: 'Gray',
        material: 'Wood',
        category: 'Kitchen',
        feature: '0fb6aeec2fcf5d72df84ceca1760c1267.avif',
        desc: 'A Table could be use for dining, Kitchen or Conference sit.',
        tag: 'Table, Kitchen, Dinning, Conference, Outside, Room'
    },
    // 9
    {
        sku: 'BED-LIVINGROOM-DE33F-M',
        name: 'Couch Floor Bed',
        color: 'Dark Gray',
        material: 'Wood',
        category: 'Living Room',
        feature: 'de33f123ea42a12f56eefafa16f3647ff.avif',
        desc: 'A black and gray floor bed.',
        tag: 'Bed Floor, Furniture, couch'
    },
    // 10
    {
        sku: 'BED-LIVINGROOM-2238E-L',
        name: 'Headboard Bedroom Mattress',
        color: 'Light Brown',
        material: 'Wood',
        category: 'Living Room',
        feature: '2238e4b081236a8f3d525fd82b1c862ce.avif',
        desc: 'Headboard Mattress Bedroom Furniture',
        tag: 'Bedroom, Furniture, Mattress, Headboard, room'
    },
    // 11
    {
        sku: 'SEAT-LIVINGROOM-EC8EF-XL',
        name: 'Beige fabric loveseat and couch',
        color: '',
        material: 'Wood and Couch',
        category: 'Living Room',
        feature: 'ec8ef685114d51d41c42605ad2dd15a14.avif',
        desc: 'Beige fabric loveseat and couch full set',
        tag: 'Beige, fabric, loveseat, Sofa, bed, Couch, Elegant sofa, interior Design'
    },
    // 12
    {
        sku: 'SEAT-LIVINGROOM-152DD-M',
        name: 'Blue 2-seat sofa',
        color: '',
        material: 'Wood, Couch, Wooden Shelf Rack',
        category: 'Living Room',
        feature: '152ddb567175bb5008f75aba22f3e8a51.avif',
        desc: '2-seat sofa in room beside brown wooden shelf rack',
        tag: '2-seat sofa, room, beside, wooden, shelf, rack, Couch, Home Furnishings, household, interior Design'
    },
    // 13
    {
        sku: 'SEAT-LIVINGROOM-0EABA-XL',
        name: 'Couch Sofa bed',
        color: 'BlueBerry',
        material: 'Wood, Couch, Cotton',
        category: 'Living Room',
        feature: '0eaba7e1872277f1a3272618b0f6ebdb3.avif',
        desc: 'Couch room chair set furniture for Living room',
        tag: 'Seat, Couch, room, Sofa bed'
    },
    // 14
    {
        sku: 'BED-LIVINGROOM-42F1E7-M',
        name: 'Gray bed comforter, Bed size Mattress Bed frame, Bed, furniture, couch, mattress Pad png',
        color: 'Dark Brown, Gray',
        material: 'Wood, Couch',
        category: 'Living Room',
        feature: '42f1e761a855f6d3d7b7031634885d4d6.avif',
        desc: 'A bed comforter, with a Mattress Bed frame, and couch',
        tag: 'bed, comforter, Mattress, frame,  couch, mattress Pad'
    },
    // 15
    {
        sku: 'SEAT-LIVINGROOM-25C88-L',
        name: 'Gray fabric padded 3-piece sofa set',
        color: 'Brown, Gray, White',
        material: 'Wood, Couch. Fabric',
        category: 'Living Room',
        feature: '25c886bd73f081c1a54331ab1738755e2.avif',
        desc: 'A Gray fabric padded 3-piece sofa set.',
        tag: 'fabric, padded, 3-piece. sofa, set, room, Interior Design'
    },
    // 16
    {
        sku: 'SEAT-LIVINGROOM-85AA4-XL',
        name: 'Suede Fabric Sectional couch with brown wooden frame',
        color: 'Gray, White, Brown',
        material: 'Wood, Cotton, Couch, Sofa',
        category: 'Living Room',
        feature: '85aa4eaa41ac03c504183db5b0adbec6b.avif',
        desc: 'A Grey suede sectional couch with brown wooden frame, Paper Bedroom Wall decal, Fabric sofa.',
        tag: 'Suede, sectional, couch, brown, wooden, frame, Paper, Wall decal, Fabric sofa, angle, '
    },
    // 17
    {
        sku: 'BED-LIVINGROOM-7624B-M',
        name: 'Flat Bed Me2U',
        color: 'Black, Gray',
        material: 'Wood, Couch',
        category: 'Living Room',
        feature: '7624b205c77022570b83e1e2ee62c62e5.avif',
        desc: 'A Flat bed for 2 people, specifically for husband and wife.',
        tag: 'Bed, 2-People, Medium, '
    },
    // 18
    {
        sku: 'BED-LIVINGROOM-DE223-M',
        name: 'Nursery Bunk Bed',
        color: 'Gray',
        material: 'Wood, Couch, Sofa',
        category: 'Living Room',
        feature: 'de223b354225ec6d5811bd30bc84c6fde.avif',
        desc: 'A Nursery Bunk bed with pillows on the bed, and mattress.',
        tag: 'Pillows, Bed, Bedroom, Nursery Bunk, mattress'
    },
    // 19
    {
        sku: 'STOOK-LIVINGROOM-28050-S',
        name: 'Round Brown Wooden Stook Table',
        color: 'Brown',
        material: 'Wood',
        category: 'Living Room',
        feature: '2805070212f6326fcc78d628e5a5d7877.avif',
        desc: 'A Round brown wooden side stook table for home',
        tag: 'Round, wooden, side table, Table, Wood, Chair, Small, home'
    },
    // 20
    {
        sku: 'SEAT-LIVINGROOM-5E1617-L',
        name: 'Wood Art Wall decal Set',
        color: 'White, Brown, Black',
        material: 'Wood, Couch, Sofa',
        category: 'Living Room',
        feature: '5e1617dedd852a4b8a36a27d720e4dee0.avif',
        desc: 'A complete set of room seats with Wood, Wall decal, and couch',
        tag: 'Wood, Wall decal, living room, angle, couch'
    },
    // 21
    {
        sku: 'TABLE-OFFICE-D0E83-N',
        name: 'Table Office & Desk Chairs Set',
        color: 'Brown, Black',
        material: 'Wood, Sofa',
        category: 'Office',
        feature: 'd0e8334ff44d20035e53bad2fbddde4e6.avif',
        desc: 'Table Office with Desk Chairs for office',
        tag: 'Table Office, Desk Chairs, Table, computer, Desk'
    },
    // 22
    {
        sku: 'TABLE-LIVINGROOM-63ADA-M',
        name: 'Computer Desk Table Office',
        color: 'Brown, Black',
        material: 'Wood, Sofa',
        category: 'Office',
        feature: '63ada762475e2ef3c002df3863a1106c2.avif',
        desc: 'A set of a computer desk table for office.',
        tag: 'Computer desk Table, Office'
    },
    // 23
    {
        sku: 'TABLE-LIVINGROOM-D177F0-S',
        name: 'Bedside Tables Dining room Coffee Tables Wood',
        color: 'Brown, Black',
        material: 'Wood',
        category: 'Living Room',
        feature: 'd177f0bd60250360dd1c62cf4fcd70c70.avif',
        desc: 'Bedside Tables Dining room Coffee Tables Wood, side table, angle, furniture, coffee Tables png',
        tag: 'Bedside Tables Dining room Coffee Tables Wood, side table, angle, furniture, coffee Tables png'
    },
    // 24
    {
        sku: 'TABLE-LIVINGROOM-E32A0-M',
        name: 'Bedside Glass Coffee Table',
        color: 'White, Black',
        material: 'Glass, Wood',
        category: 'Living Room',
        feature: 'e32a0d53e783dc14543ba13e1dad7e0d4.avif',
        desc: 'Bedside Glass Coffee Table',
        tag: 'Bedside Tables, Coffee, table, glass, kitchen'
    },
    // 25
    {
        sku: 'CHAIR-87810-M',
        name: 'Black Swivel chair',
        color: 'Black',
        material: 'Sofa, Metal',
        category: 'Living Room, Office',
        feature: '87810074e188b5552fc4476f8a534d51c.avif',
        desc: 'Black Swivel leather office rolling armchair, office, Rolling Chair, leather',
        tag: 'leather, room, office rolling armchair, chair Swivel, Rolling Chair'
    },
    // 26
    {
        sku: 'CHAIR-4E2C8-M',
        name: 'Arm Rest Comfort Commode chair',
        color: 'Gray, Brown',
        material: 'Sofa, Wood',
        category: 'Living Room, Office',
        feature: '4e2c8fcfba665eec4d485faa1a5fe4668.avif',
        desc: 'Arm Resting Comfort Chair',
        tag: 'Chair, Comfort , Commode, Sofa, Wood Legs'
    },
    // 27
    {
        sku: 'CHAIR-BEBC5-M',
        name: 'Armless Comfort Chair',
        color: 'Gray',
        material: 'Sofa, Metal',
        category: 'Living Room, Office',
        feature: 'bebc50bd6240c3cd7de221fd14735afca.avif',
        desc: 'Armless Comfortable chair suitable for office and room.',
        tag: 'Armless Chair, Office, Living Room, Comfort'
    },
    // 28
    {
        sku: 'CHAIR-5C8F1-M',
        name: 'Armchair Couch Loveseat Chair',
        color: 'Blue',
        material: 'Soft, Leather, Couch',
        category: 'Living Room, Office',
        feature: '5c8f1c2bbe1af744a15dd826aa210c731.avif',
        desc: 'Couch Loveseat Sofa Chair, with armchair, in blue and leather',
        tag: 'Couch, Loveseat, Sofa, Chair, ArmChair, Leather'
    },
    // 29
    {
        sku: 'SEAT-7C5FC-M',
        name: 'Upholstery Couch Seat Chair',
        color: 'Dark Gray',
        material: 'Couch, Sofa',
        category: 'Living Room, Office',
        feature: '7c5fc11a51188414ce316f62ce02b4807.avif',
        desc: 'A Upholstery Couch Seat Chair, with sofa, and leather',
        tag: 'Couch, Seat, Chair, Upholstery, sofa, leather'
    },
    // 30
    {
        sku: 'CHAIR-2058E-M',
        name: 'Couch Wing Bean Bag Chair',
        color: 'Brown',
        material: 'Wood, Leather, Sofa',
        category: 'Living Room, Office',
        feature: '2058e68ed01b6bfa5d7dc32ecd6a87b2b.avif',
        desc: 'A Couch Wing Bean Bag Chair',
        tag: 'Couch, Wing, chair, Bean Bag Chairs, leather, wood. sofa'
    },
    // 31
    {
        sku: 'CHAIR-BFD55-S',
        name: 'Armless Chair',
        color: 'Dark Gray',
        material: 'Cotton, Sofa, Wood',
        category: 'Living Room, Office',
        feature: 'bfd55704d38f1ecb1e0ac48705a87eee8.avif',
        desc: 'Armless Chair with 4 legs',
        tag: 'Armless, Chair, Office, Living Room, 4 legs'
    },
    // 32
    {
        sku: 'SEAT-855CE-M',
        name: 'Upholstery Eames Lounge Wing Chair',
        color: 'Blue',
        material: 'Cotton, Wood',
        category: 'Living Room, Office',
        feature: '855ceaf028838383813418f0ef87157f3.avif',
        desc: 'Eames Lounge Wing Chair',
        tag: 'Eames, Lounge Chair, Upholstery, chair, wing, Comfort, Living Room, Office'
    },
    // 33
    {
        sku: 'CHAIR-F2107D-S',
        name: 'Eames Lounge Chair Mid-century',
        color: 'Light Gray, Brown',
        material: 'Cotton, Wood',
        category: 'Living Room, Office',
        feature: 'f2107dea3258e0cbe764318fe77a185a3.avif',
        desc: 'Eames Lounge Chair Mid-century Modern furniture, Simple wooden chair texture',
        tag: 'Eames, Lounge, Chair, Mid-century, Modern, Simple wooden, texture, Living Room, Office'
    },
    // 34
    {
        sku: 'CHAIR-82A0D-M',
        name: 'Eames Lounge Chair Office & Desk Chairs Furniture Swivel chair.',
        color: 'Black',
        material: 'Sofa, Metal',
        category: 'Living Room, Office',
        feature: '82a0daee36f308855c7b3a73bbaee2454.avif',
        desc: 'Eames Lounge Chair Office & Desk Chairs Furniture Swivel chair, Leather Chair, angle, fauteuil, wing Chair',
        tag: 'Eames, Lounge, Living Room, Office, Swivel chair, Leather Chair, wing chair'
    },
    // 35
    {
        sku: 'CHAIR-EE6C4-S',
        name: 'Eames ArmRest Lounge',
        color: 'Gray, Brown',
        material: 'Sofa, Wood',
        category: 'Living Room, Office, Kitchen',
        feature: 'ee6c4b6208325777d4578a840eb88abc3.avif',
        desc: 'Eames Lounge Chair',
        tag: 'Eames, Lounge Chair, Chair, Dining room, kitchen, armrest, living room, office.'
    },
    // 36
    {
        sku: 'SEAT-874D5-M',
        name: 'Eames Lounge Wing Chair',
        color: 'Light Brown',
        material: 'Cotton, Wood, Sofa',
        category: 'Living Room, Office',
        feature: '874d53347057f086618dd5b6ea74bc86d.avif',
        desc: 'Eames Lounge Wing chair',
        tag: 'Eames, Lounge Chair, Wing chair'
    },
    // 37
    {
        sku: 'SEAT-B12F3A-M',
        name: 'Loveseat Couch Seat Haiku',
        color: 'Light Gray',
        material: 'Cotton',
        category: 'Living Room, Office',
        feature: 'b12f3aeafaeb4cf5475a358eb61cd5423.avif',
        desc: 'Loveseat Couch seat haiku, White Modern Armchair',
        tag: 'Loveseat, Couch, Chair, Haiku, Modern, Armchair, sofa'
    },
    // 38
    {
        sku: 'CHAIR-06F5B-S',
        name: 'Office & Desk Chair',
        color: 'White',
        material: 'Leather, Sofa, Metal',
        category: 'Living Room',
        feature: '06f5b3ffe07b61d4d5358ef2af6572fe2.avif',
        desc: 'Office & Desk Chair',
        tag: 'Wheels,Desk, chair, room, office'
    },
    // 39
    {
        sku: 'CHAIR-4C5FCF-M',
        name: 'Gaming Office & Desk Chair',
        color: 'Black',
        material: 'Sofa, Bicast Leather, Metal, Plastic',
        category: 'Living Room, Office',
        feature: '4c5fcf12d8bf105268a826b06555305b2.avif',
        desc: 'Office & Desk Gaming chair with Bicast leather',
        tag: 'living room, Office & Desk, Gaming chair, Bicast leather, chair, leather'
    },
    // 40
    {
        sku: 'CHAIR-1BF0F-S',
        name: 'Office & Desk Armrest Swivel chair',
        color: 'Black',
        material: 'Cotton, Sofa, Plastic',
        category: 'Living Room, Office',
        feature: '1bf0fb0cc4fdc27acb3ef87ae203486da.avif',
        desc: 'Office & Desk Chairs Swivel chair, chair, angle, furniture, armrest png',
        tag: 'Office & Desk Chairs Swivel chair, chair, angle, furniture, armrest png'
    },
    // 41
    {
        sku: 'CHAIR-37F3D-S',
        name: 'Middle Half Man Chair',
        color: 'Red',
        material: 'Plastic',
        category: 'Living Room, Office',
        feature: '37f3dbf4fb281a881804faa4b11b826df.avif',
        desc: 'Middle Half Man Chair',
        tag: 'Chair, Office, Living room, Half Chair, Small, Comfortable'
    },
    // 42
    {
        sku: 'CHAIR-13D12-M',
        name: 'Recliner Chair',
        color: 'Black Gray',
        material: 'Cotton',
        category: 'Living Room, Office',
        feature: '13d1227c54ca13b8547828374253d56df.avif',
        desc: 'Recliner Chair Seat Living room',
        tag: 'Recliner Chair'
    },
    // 43
    {
        sku: 'TABLE-3734C-M',
        name: 'Round table Eettafel Oak',
        color: 'Brown, Black',
        material: 'Wood, Metal',
        category: 'Living Room',
        feature: '3734ce500afeba87eb27eb5001474e320.avif',
        desc: 'Round table Eettafel Oak table',
        tag: 'living, room, office, Round table, Eettafel Oak, table, outdoor Table'
    },
    // 44
    {
        sku: 'BED-LIVINGROOM-783D3-L',
        name: 'Sofa Couch Recliner Commode Chaise longue Seat & Bed',
        color: 'Brown',
        material: 'Cotton, Leather, Sofa',
        category: 'Living Room',
        feature: '783d387c166c4c4b6760a31cce3364bf5.avif',
        desc: 'Sofa Couch Recliner Commode Chaise longue Bed',
        tag: 'Sofa bed Couch Recliner Commode Chaise longue, chair, couch'
    },
    // 45
    {
        sku: 'SHELF-6DAE4-L',
        name: 'Bookcase Shelf',
        color: 'White',
        material: 'Wood',
        category: 'Living Room, Office',
        feature: '6dae43b345e8d4f86606c0d11afeee650.avif',
        desc: 'Modern architecture Interior Design Services Bookcase Shelf',
        tag: 'Bookcase Shelf, Modern architecture Interior Design, bookcase'
    },
    // 46
    {
        sku: 'CHAIR-266FE-M',
        name: 'Couch Stool Chair',
        color: 'Black',
        material: 'Sofa, Cotton, Leather, Metal',
        category: 'Living Room, Office',
        feature: '266fea4bbfcfdec4a3d8b651ab8187067.avif',
        desc: 'A black Chair Couch Stool Chair for computer, office, and room',
        tag: 'living room, Couch Stool, chair, computer, office'
    },
    // 47
    {
        sku: 'SEAT-43A58-M',
        name: 'Couch Chair Ottoman',
        color: 'Orange',
        material: 'Sofa, Cotton, Metal',
        category: 'Living Room, Office',
        feature: '43a58fac20dd2f11254ca14befcbdcd8e.avif',
        desc: 'Ottoman Couch Chair',
        tag: 'Couch Chair, Ottoman, Orange, sofa, living, room'
    },
    // 48
    {
        sku: 'TABLE-024B7-S',
        name: 'Loft Dining table',
        color: 'Brown',
        material: 'Wood',
        category: 'Living Room, Office, Kitchen',
        feature: '024b7bed61f2e050afb547c7812c87fde.avif',
        desc: 'Loft Round Dining table',
        tag: 'Table, Loft, Dining, room, living, kitchen, office'
    },
    // 49
    {
        sku: 'TABLE-7B56F-M',
        name: 'Nightstand Table',
        color: 'Brown',
        material: 'Wood',
        category: 'Living Room, Office, Kitchen',
        desc: 'Nightstand Table',
        feature: '7b56f34f8c8e2a803c5bd31f5b01be7bb.avif',
        tag: 'Table, Nightstand, Table, rectangle, small, medium'
    },
    // 50
    {
        sku: 'CHAIR-LIVINGROOM-CE330-M',
        name: 'Varier Furniture AS Kneeling Recliner, modern chair',
        color: 'Black, Brown',
        material: 'Wood, Cotton, Sofa',
        category: 'Living Room',
        feature: 'ce330a2a4776cc486f8c1adc432f1caa0.avif',
        desc: 'Varier Furniture AS Kneeling chair Recliner Table, modern chair, furniture, stool, wing Chair',
        tag: 'Varier Furniture AS Kneeling chair, Recliner Table, modern chair, stool, wing Chair'
    },
    // 51
    {
        sku: 'CHAIR-F452C-M',
        name: 'Window Living room Curtain Couch ArmChair',
        color: 'Tufted Yellow',
        material: 'Sofa, Cotton, Wood, Leather',
        category: 'Living Room, Office',
        feature: 'f452c6b3883a57f36e6bedbcafb068a6e.avif',
        desc: 'Window Living room Curtain Couch ArmChair',
        tag: 'Living room, Curtain, Couch, tufted yellow, leather, armchair, textile, sofa, office'
    },
    // 52
    {
        sku: 'CHAIR-1F1C8A-M',
        name: 'Wing lazy chair',
        color: 'Shy Orange',
        material: 'Cotton, Wood',
        category: 'Living Room, Office',
        feature: '1f1c8a17bdf2a4816fd552c3215535875.avif',
        desc: 'Wing  lazy chair',
        tag: 'Wing chair, lazy chair, office, living room'
    },
].map(product => prismaDB.product.create({
    data: {
        ...product,
        price: Number(Math.round(Math.random() * 100.0).toFixed(2) + 5)
    }
})))

const end = performance.now();
console.log(`🚀 Seeded the database. Done in ${Math.round(end - start)}ms`);
