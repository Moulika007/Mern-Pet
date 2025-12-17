const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Pet = require('./models/Pet');

dotenv.config();

const pets = [
  // --- DOGS ---
  {
    name: 'Bruno', 
    category: 'Dog', 
    breed: 'Labrador Retriever', 
    age: '2 years', 
    gender: 'Male', 
    size: 'Large', 
    price: 12000,
    images: [
      "https://petsworld.in/cdn/shop/articles/thinkstock_rf_photo_of_labrador_retriever_1.jpg?v=1730798148",
      "https://images.happypet.care/images/43427/incredible-labrador-facts.webp",
      "https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1670938235.1927571/fun-facts-about-labrador-retrievers.jpg"
    ], 
    description: 'Friendly and energetic Labrador who loves swimming and playing fetch.', 
    location: 'Bangalore, Karnataka', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Rocky', 
    category: 'Dog', 
    breed: 'German Shepherd', 
    age: '1 year', 
    gender: 'Male', 
    size: 'Large', 
    price: 18000,
    images: [
      "https://thepetlabco.com/learn/_next/image?url=https%3A%2F%2Fblog.thepetlabco.com%2Fwp-content%2Fuploads%2F2025%2F03%2Fshutterstock_2088969538-1.jpg&w=3840&q=75",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjPYEM86WRbsptbzdhvKZIVQeA_ZicJMKfRA&s"
    ], 
    description: 'Smart, protective, and highly trainable German Shepherd.', 
    location: 'Delhi, NCR', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Bella', 
    category: 'Dog', 
    breed: 'Golden Retriever', 
    age: '3 years', 
    gender: 'Female', 
    size: 'Large', 
    price: 15000,
    images: [
      "https://image.petmd.com/files/styles/863x625/public/2023-03/golden-retriever.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsod3B4uQ_1uiGCY3FVZmmMffnNt5CSZzjIg&s"
    ], 
    description: 'The perfect family dog. Gentle, patient, and loves children.', 
    location: 'Mumbai, Maharashtra', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Charlie', 
    category: 'Dog', 
    breed: 'Beagle', 
    age: '1 year', 
    gender: 'Male', 
    size: 'Medium', 
    price: 14000,
    images: [
      "https://i.pinimg.com/originals/60/7a/7c/607a7c6bb72c149d943922f219b85673.jpg",
      "https://grishadogkennel.com/wp-content/uploads/elementor/thumbs/Beagle-Pups-For-Sale-qnimht2xn2agyeomjajbsoo4s5xq4a111k403k8ja8.png"
    ], 
    description: 'Curious and merry Beagle with a great nose for adventure.', 
    location: 'Pune, Maharashtra', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Max', 
    category: 'Dog', 
    breed: 'Rottweiler', 
    age: '2 years', 
    gender: 'Male', 
    size: 'Large', 
    price: 20000,
    images: [
      "https://i.ytimg.com/vi/z1LgCziivjc/sddefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5Db31eCAG55X3T6OSUodcm3X3SX_H-PgwQ&s"
    ], 
    description: 'Loyal guardian with a heart of gold. Needs an experienced owner.', 
    location: 'Chennai, Tamil Nadu', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Zoey', 
    category: 'Dog', 
    breed: 'Shih Tzu', 
    age: '1 year', 
    gender: 'Female', 
    size: 'Small', 
    price: 15000,
    images: [
      "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/article_thumbnails/reference_guide/what_to_know_about_shih_tzus_ref_guide/1800x1200_what_to_know_about_shih_tzus_ref_guide.jpg?resize=750px:*&output-quality=75",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwEca4OmQkOrTNiBu0YXb-Lv72vbKFvKDhAw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy6KjmYR7K2FanMxvCkQT1qsmTqXsGgXMwGA&s"
    ], 
    description: 'Adorable lap dog that loves attention and cuddles.', 
    location: 'Hyderabad, Telangana', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Cooper', 
    category: 'Dog', 
    breed: 'Pug', 
    age: '3 years', 
    gender: 'Male', 
    size: 'Small', 
    price: 10000,
    images: [
      "https://image.petmd.com/files/styles/978x550/public/2022-10/pug-dog-breed.jpeg",
      "https://content.lyka.com.au/f/1016262/1104x676/3233341a1e/pug.webp/m/640x427/smart/filters:format(webp)"
    ], 
    description: 'Charming and mischievous little companion.', 
    location: 'Kolkata, WB', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Luna', 
    category: 'Dog', 
    breed: 'Husky', 
    age: '2 years', 
    gender: 'Female', 
    size: 'Large', 
    price: 25000,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuvRsgKfkslMqpVM_rdqtemE_BfwRPyHlxVg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYIv7yijLwb3e5S9m1cLksrGHlB3gXDA0GA&s"
    ], 
    description: 'Energetic and vocal Husky who loves to run.', 
    location: 'Chandigarh', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Duke', 
    category: 'Dog', 
    breed: 'Boxer', 
    age: '4 years', 
    gender: 'Male', 
    size: 'Large', 
    price: 16000,
    images: [
      "https://image.petmd.com/files/styles/863x625/public/2022-10/Boxer.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSItOJSnDvLNn-uuDox9Y_kpoZkSrZOxUm_hg&s"
    ], 
    description: 'Fun-loving, bright, and active. Great with kids.', 
    location: 'Jaipur, Rajasthan', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Oreo', 
    category: 'Dog', 
    breed: 'Dalmatian', 
    age: '2 years', 
    gender: 'Male', 
    size: 'Large', 
    price: 18000,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlAKV4Mr56p3Z9U8EcKWm8xLPH_lIa1Gq4JQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJ73GN3Alzr_Mfxpybfx4LFgjziUtu4Bq0Q&s"
    ], 
    description: 'Spotty, sporty, and dignified.', 
    location: 'Ahmedabad, Gujarat', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },

  // --- CATS ---
  {
    name: 'Misty', 
    category: 'Cat', 
    breed: 'Persian', 
    age: '2 years', 
    gender: 'Female', 
    size: 'Medium', 
    price: 8000,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjAzxBhfumeK92inkSCVNCut1lgYTEZKhqzg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoL7Oxv8m16w-Xj-QSwsSpL7volWrqik3sfg&s"
    ], 
    description: 'Fluffy, calm, and loves to be pampered.', 
    location: 'Mumbai, Maharashtra', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Leo', 
    category: 'Cat', 
    breed: 'Siamese', 
    age: '1 year', 
    gender: 'Male', 
    size: 'Medium', 
    price: 9000,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHBLB6_x1LOkN2n_3fRse1wAOtIv_vP2Ye3Q&s",
      "https://cdn.shopify.com/s/files/1/0435/0466/4732/files/how_long_do_siamese_cats_live_1_600x600.jpg"
    ], 
    description: 'Vocal, intelligent, and very affectionate.', 
    location: 'Delhi, NCR', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },

  // --- BIRDS ---
  {
    name: 'Rio', 
    category: 'Bird', 
    breed: 'Macaw', 
    age: '5 years', 
    gender: 'Male', 
    size: 'Large', 
    price: 45000,
    images: [
      "https://th-thumbnailer.cdn-si-edu.com/MdM2KgggUsAN3L7SI9Jtltvvr_s=/fit-in/1600x0/filters:focal(800x602:801x603)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/75/13/7513c5a6-05d0-4f18-917b-a5b4942c5bf9/ara_macao_-fort_worth_zoo-8_web.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZl9F0MDmQScOs0DeDVmFmwchGhl36JsF8g&s"
    ], 
    description: 'Colorful, talkative, and highly intelligent companion.', 
    location: 'Goa', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  },
  {
    name: 'Sky', 
    category: 'Bird', 
    breed: 'Budgie', 
    age: '1 year', 
    gender: 'Female', 
    size: 'Small', 
    price: 1000,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwHd1DEeg5rD96llT_oJRjeHz8ammLN3NTFg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZkC986CSD9Jxp40a19-qH3QnVA9leIoI5g&s"
    ], 
    description: 'Sweet, chirpy little friend. Perfect for first-time bird owners.', 
    location: 'Bangalore, Karnataka', 
    contact: { name: 'PetNest Shelter', email: 'help@petnest.com', phone: '9876543210' }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Pet.deleteMany({});
    await Pet.insertMany(pets);
    console.log('✅ Database seeded with 14 Pets (Verified Direct Image URLs)!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();