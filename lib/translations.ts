export type Language = 'en' | 'am' | 'es'

export interface Translations {
  // Navigation
  nav: {
    home: string
    about: string
    services: string
    gallery: string
    pricing: string
    testimonials: string
    contact: string
    bookAppointment: string
  }
  
  // Hero Section
  hero: {
    title: string
    subtitle: string
    bookButton: string
    viewServicesButton: string
  }
  
  // Intro Grid
  intro: {
    philosophy: string
    title: string
    description: string
    reserveButton: string
  }
  
  // Services
  services: {
    eyebrow: string
    title: string
    subtitle: string
    priceNote: string
    categories: Array<{
      name: string
    items: Array<{
      name: string
      description: string
      price: string
      }>
    }>
  }
  
  // Gallery
  gallery: {
    eyebrow: string
    title: string
    subtitle: string
  }
  
  // Pricing
  pricing: {
    eyebrow: string
    title: string
    subtitle: string
    groups: Array<{
      name: string
      items: Array<{
        name: string
        price: string
      }>
    }>
  }
  
  // Testimonials
  testimonials: {
    eyebrow: string
    title: string
    subtitle: string
    items: Array<{
      text: string
      author: string
      role: string
    }>
  }
  
  // Contact
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    form: {
      firstName: string
      lastName: string
      email: string
      phone: string
      message: string
      sendButton: string
    }
    info: {
      address: string
      phone: string
      email: string
      hours: string
    }
  }
  
  // Footer
  footer: {
    cta: string
    ctaButton: string
    copyright: string
  }
  
  // Booking Page
  booking: {
    title: string
    subtitle: string
    form: {
      firstName: string
      lastName: string
      email: string
      phone: string
      service: string
      date: string
      time: string
      notes: string
      notesPlaceholder: string
      submit: string
      submitted: string
      successMessage: string
      required: string
      invalidEmail: string
      invalidPhone: string
      pastDate: string
    }
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      gallery: 'Gallery',
      pricing: 'Pricing',
      testimonials: 'Testimonials',
      contact: 'Contact',
      bookAppointment: 'Book Appointment'
    },
    hero: {
      title: 'Embrace Your Natural Beauty,\nCelebrate Your Crown',
      subtitle: 'Expert care for natural hair, protective styles, and all textures. Where your hair journey begins with confidence and authenticity.',
      bookButton: 'Book Your Appointment',
      viewServicesButton: 'View Services'
    },
    intro: {
      philosophy: 'Our Philosophy',
      title: 'Celebrating Natural Beauty',
      description: 'At Fifi Hair Salon, we celebrate the beauty and diversity of black hair. Our expert stylists understand the unique needs of natural hair, protective styles, and all textures. We\'re here to empower your hair journey with knowledge, care, and authentic beauty.',
      reserveButton: 'Reserve Your Spot'
    },
    services: {
      eyebrow: 'Services',
      title: 'Our Complete Menu',
      subtitle: 'Professional hair care services tailored to your unique needs and style.',
      priceNote: 'Price does not include hair',
      categories: [
        {
          name: 'Braids & Protective Styles',
          items: [
            { name: 'Natural Cornrows', description: 'Classic cornrow braids for a timeless look', price: '$45.00 UP' },
            { name: 'Feed In Cornrows', description: 'Natural-looking cornrows with added hair', price: '$85.00 UP' },
            { name: 'Individual Braids', description: 'Individual box braids for length and style', price: '$165.00 UP' },
            { name: 'Knotless Box Braids', description: 'Gentle knotless technique for comfort (18 in)', price: '$185.00 UP' },
            { name: 'Goddess Braids', description: 'Elegant goddess braids for special occasions', price: '$15.00 UP each' },
            { name: 'Kinky Twist Braids', description: 'Textured twist braids for natural movement', price: '$145.00 UP' },
            { name: 'Senegalese Twist', description: 'Smooth, sleek twist braids', price: '$175.00 UP' },
            { name: 'Tree Braids', description: 'Natural-looking braids with extensions', price: '$165.00 UP' },
            { name: 'Crochet Braids', description: 'Quick and versatile protective style', price: '$100.00 UP' },
            { name: 'Half Cornrows & Half Box Braids', description: 'Creative combination style', price: '$125.00 UP' },
            { name: 'Ponytail Cornrows', description: 'Stylish cornrows leading to ponytail', price: '$95.00 UP' }
          ]
        },
        {
          name: 'Dreadlocks & Locs',
          items: [
            { name: 'Dreadlocks', description: 'Professional dreadlock installation', price: '$85.00 UP' },
            { name: 'Dread Retwist', description: 'Maintenance and retwisting service', price: '$65.00 UP' },
            { name: 'Fake Dread', description: 'Temporary dreadlock styling', price: '$185.00 UP' }
          ]
        },
        {
          name: 'Hair Extensions & Weaves',
          items: [
            { name: 'Weave Sewing', description: 'Professional weave installation', price: '$125.00 UP' },
            { name: 'Weave Straightening', description: 'Straightening service for weaves', price: '$65.00 UP' },
            { name: 'Weave Take Out', description: 'Safe removal of sewn-in weaves', price: '$35.00 UP' },
            { name: 'Weave Wash & Set', description: 'Cleaning and styling for weaves', price: '$55.00 UP' },
            { name: 'Extensions Removal', description: 'Professional extension removal', price: '$35.00 UP' },
            { name: 'Extension Wash', description: 'Specialized cleaning for extensions', price: '$25.00 UP' }
          ]
        },
        {
          name: 'Hair Care & Styling',
          items: [
            { name: 'Wash & Set', description: 'Professional wash and styling', price: '$45.00 UP' },
            { name: 'Hair Straightening', description: 'Smooth straightening service', price: '$55.00 UP' },
            { name: 'Twist Natural Hair', description: 'Styling natural hair with twists', price: '$65.00 UP' },
            { name: 'Treatment', description: 'Deep conditioning and hair treatments', price: '$25.00 UP' },
            { name: 'Trim', description: 'Precise hair trimming and shaping', price: '$25.00 UP' },
            { name: 'Individual Braids Take Out', description: 'Safe removal of individual braids', price: '$45.00 UP' },
            { name: 'Cornrows Take Out', description: 'Gentle cornrow removal', price: '$35.00 UP' }
          ]
        }
      ]
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Recent Work',
      subtitle: 'A glimpse into styles created by our team.'
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Service Packages',
      subtitle: 'Transparent pricing for all our services.',
      groups: [
        {
          name: 'Natural Hair',
          items: [
            { name: 'Wash & Style', price: '$35' },
            { name: 'Trim & Shape', price: '$45' },
            { name: 'Deep Condition', price: '$25' }
          ]
        },
        {
          name: 'Protective Styles',
          items: [
            { name: 'Box Braids (Small)', price: '$120' },
            { name: 'Box Braids (Medium)', price: '$100' },
            { name: 'Cornrows', price: '$60' },
            { name: 'Twists', price: '$80' }
          ]
        },
        {
          name: 'Color & Treatments',
          items: [
            { name: 'Color Consultation', price: '$25' },
            { name: 'Full Color', price: '$95' },
            { name: 'Highlights', price: '$85' },
            { name: 'Silk Press', price: '$65' }
          ]
        }
      ]
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What Our Clients Say',
      subtitle: 'Real experiences from our valued clients.',
      items: [
        {
          text: 'Fifi truly understands natural hair. My curls have never looked better!',
          author: 'Sarah Johnson',
          role: 'Natural Hair Client'
        },
        {
          text: 'The braids are so neat and lasted for months. Highly recommend!',
          author: 'Aisha Williams',
          role: 'Protective Style Client'
        },
        {
          text: 'Finally found a salon that celebrates my natural texture. Love it here!',
          author: 'Maya Davis',
          role: 'Regular Client'
        }
      ]
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Get In Touch',
      subtitle: 'Your trusted salon for natural hair care and protective styles.',
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        sendButton: 'Send Message'
      },
      info: {
        address: '123 Main Street, City, State 12345',
        phone: '(555) 123-4567',
        email: 'info@fifihairsalon.com',
        hours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-5PM'
      }
    },
    footer: {
      cta: 'Ready to embrace your natural beauty?',
      ctaButton: 'Book Your Appointment',
      copyright: '© 2024 Fifi Hair Salon. All rights reserved.'
    },
    booking: {
      title: 'Book Your Hair Journey',
      subtitle: 'Ready to embrace your natural beauty? Let\'s create something amazing together.',
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone Number',
        service: 'Service Selection',
        date: 'Preferred Date',
        time: 'Preferred Time',
        notes: 'Additional Notes',
        notesPlaceholder: 'Tell us about your hair goals, any specific requests, or questions you have...',
        submit: 'Book Your Appointment',
        submitted: 'Booking Submitted!',
        successMessage: 'Thank you! We\'ve received your booking request and will confirm your appointment within 24 hours.',
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
        invalidPhone: 'Please enter a valid phone number',
        pastDate: 'Please select a future date'
      }
    }
  },
  am: {
    nav: {
      home: 'መነሻ',
      about: 'ስለ እኛ',
      services: 'አገልግሎቶች',
      gallery: 'ጋለሪ',
      pricing: 'ዋጋ',
      testimonials: 'ምስክሮች',
      contact: 'አግኙን',
      bookAppointment: 'ጥበቃ ያስቀምጡ'
    },
    hero: {
      title: 'የተፈጥሮ ውበትዎን ይቀበሉ፣\nየእርስዎን አክሊል ያስከብሩ',
      subtitle: 'ለተፈጥሮ ጸጉር፣ ለመከላከያ ዘዴዎች እና ለሁሉም ዓይነት ጸጉር ልዩ እንክብካቤ። የጸጉር ጉዞዎ በምስጥነት እና በእውነተኛነት የሚጀምርበት ቦታ።',
      bookButton: 'ጥበቃ ያስቀምጡ',
      viewServicesButton: 'አገልግሎቶችን ይመልከቱ'
    },
    intro: {
      philosophy: 'የእኛ ፍልስፍና',
      title: 'የተፈጥሮ ውበትን ማስከበር',
      description: 'በፊፊ የጸጉር ሳሎን፣ የጥቁር ጸጉር ውበትን እና ልዩነትን እናስከብራለን። የእኛ ልዩ ስራ አጫዋቾች የተፈጥሮ ጸጉር፣ የመከላከያ ዘዴዎች እና ሁሉንም ዓይነት ጸጉር ልዩ ፍላጎቶችን ይረዳሉ። የጸጉር ጉዞዎን በእውቀት፣ በእንክብካቤ እና በእውነተኛ ውበት ለማስተዳደር እዚህ ነን።',
      reserveButton: 'ቦታዎን ያስቀምጡ'
    },
    services: {
      eyebrow: 'አገልግሎቶች',
      title: 'የእኛ ሙሉ ዝርዝር',
      subtitle: 'ለልዩ ፍላጎቶችዎ እና ስልት የተበጀ ሙያዊ የጸጉር እንክብካቤ አገልግሎቶች።',
      priceNote: 'ዋጋው ጸጉርን አያካተትም',
      categories: [
        {
          name: 'ብሬዶች እና የመከላከያ ዘዴዎች',
          items: [
            { name: 'ተፈጥሮ ኮርንሮዎች', description: 'ወቅታዊ የሆነ ኮርንሮ ብሬዶች', price: '$45.00 UP' },
            { name: 'ፊድ ኢን ኮርንሮዎች', description: 'ተጨማሪ ጸጉር ያለው ተፈጥሮ ኮርንሮዎች', price: '$85.00 UP' },
            { name: 'የግል ብሬዶች', description: 'ርዝመት እና ስልት ለማግኘት የግል ቦክስ ብሬዶች', price: '$165.00 UP' },
            { name: 'ኖትሌስ ቦክስ ብሬዶች', description: 'አቀም ለማግኘት የሚረዳ የኖትሌስ ዘዴ (18 in)', price: '$185.00 UP' },
            { name: 'ጎዴስ ብሬዶች', description: 'ለልዩ ክስተቶች የሚሆን የጎዴስ ብሬዶች', price: '$15.00 UP each' },
            { name: 'ኪንኪ ትዊስት ብሬዶች', description: 'ተፈጥሮ እንቅስቃሴ ለማግኘት የተጠማዘዘ ብሬዶች', price: '$145.00 UP' },
            { name: 'ሴኔጋሌስ ትዊስት', description: 'ለስላሳ፣ የሚያምር ትዊስት ብሬዶች', price: '$175.00 UP' },
            { name: 'ትሪ ብሬዶች', description: 'ተጨማሪ ጸጉር ያለው ተፈጥሮ ብሬዶች', price: '$165.00 UP' },
            { name: 'ክሮሸ ብሬዶች', description: 'ፈጣን እና ተለዋዋጭ የመከላከያ ዘዴ', price: '$100.00 UP' },
            { name: 'ግማሽ ኮርንሮዎች እና ግማሽ ቦክስ ብሬዶች', description: 'ፈጠራ የሆነ የማያያዝ ዘዴ', price: '$125.00 UP' },
            { name: 'ፖኒቴይል ኮርንሮዎች', description: 'ወደ ፖኒቴይል የሚያመራ የስልት ኮርንሮዎች', price: '$95.00 UP' }
          ]
        },
        {
          name: 'ድሬድሎክስ እና ሎክስ',
          items: [
            { name: 'ድሬድሎክስ', description: 'ሙያዊ ድሬድሎክ መጫን', price: '$85.00 UP' },
            { name: 'ድሬድ ሪትዊስት', description: 'ጠበቃ እና የሪትዊስት አገልግሎት', price: '$65.00 UP' },
            { name: 'የሐሰት ድሬድ', description: 'ጊዜያዊ ድሬድሎክ ስታይሊንግ', price: '$185.00 UP' }
          ]
        },
        {
          name: 'የጸጉር ተጨማሪዎች እና ዊቭስ',
          items: [
            { name: 'ዊቭ ሲዊንግ', description: 'ሙያዊ ዊቭ መጫን', price: '$125.00 UP' },
            { name: 'ዊቭ ስትሬይትኒንግ', description: 'ለዊቭስ የሚሆን የስትሬይትኒንግ አገልግሎት', price: '$65.00 UP' },
            { name: 'ዊቭ ቴክ አውት', description: 'የተሰፋ ዊቭስ አስተማማኝ ማስወገድ', price: '$35.00 UP' },
            { name: 'ዊቭ ዋሽ ኤንድ ሴት', description: 'ለዊቭስ የሚሆን ማጽዳት እና ስታይሊንግ', price: '$55.00 UP' },
            { name: 'ተጨማሪዎች ማስወገድ', description: 'ሙያዊ የተጨማሪ ማስወገድ', price: '$35.00 UP' },
            { name: 'ተጨማሪ ዋሽ', description: 'ለተጨማሪዎች የሚሆን ልዩ ማጽዳት', price: '$25.00 UP' }
          ]
        },
        {
          name: 'የጸጉር እንክብካቤ እና ስታይሊንግ',
          items: [
            { name: 'ዋሽ ኤንድ ሴት', description: 'ሙያዊ ዋሽ እና ስታይሊንግ', price: '$45.00 UP' },
            { name: 'የጸጉር ስትሬይትኒንግ', description: 'ለስላሳ የስትሬይትኒንግ አገልግሎት', price: '$55.00 UP' },
            { name: 'ትዊስት ተፈጥሮ ጸጉር', description: 'ተፈጥሮ ጸጉርን በትዊስቶች ማስቀረት', price: '$65.00 UP' },
            { name: 'ሕክምና', description: 'ጥልቅ ማስተካከያ እና የጸጉር ሕክምናዎች', price: '$25.00 UP' },
            { name: 'መቆረጥ', description: 'ትክክለኛ የጸጉር መቆረጥ እና ማስቀረት', price: '$25.00 UP' },
            { name: 'የግል ብሬዶች ቴክ አውት', description: 'የግል ብሬዶች አስተማማኝ ማስወገድ', price: '$45.00 UP' },
            { name: 'ኮርንሮዎች ቴክ አውት', description: 'ኮርንሮዎች ለስላሳ ማስወገድ', price: '$35.00 UP' }
          ]
        }
      ]
    },
    gallery: {
      eyebrow: 'ጋለሪ',
      title: 'የቅርብ ጊዜ ስራ',
      subtitle: 'በቡድናችን የተፈጠሩ ዘዴዎች ውስጥ ትንሽ እይታ።'
    },
    pricing: {
      eyebrow: 'ዋጋ',
      title: 'የአገልግሎት ጥቅሎች',
      subtitle: 'ለሁሉም አገልግሎቶቻችን ግልጽ ዋጋ።',
      groups: [
        {
          name: 'የተፈጥሮ ጸጉር',
          items: [
            { name: 'መታጠብ እና ማስቀረት', price: '$35' },
            { name: 'መቆረጥ እና ማስቀረት', price: '$45' },
            { name: 'ጥልቅ ማስተካከያ', price: '$25' }
          ]
        },
        {
          name: 'የመከላከያ ዘዴዎች',
          items: [
            { name: 'የሳልጣ ብሬዶች (ትንሽ)', price: '$120' },
            { name: 'የሳልጣ ብሬዶች (መካከለኛ)', price: '$100' },
            { name: 'ኮርንሮዎች', price: '$60' },
            { name: 'ትዊስቶች', price: '$80' }
          ]
        },
        {
          name: 'ቀለም እና ሕክምናዎች',
          items: [
            { name: 'የቀለም ምክክር', price: '$25' },
            { name: 'ሙሉ ቀለም', price: '$95' },
            { name: 'ሃይላይቶች', price: '$85' },
            { name: 'ሲልክ ፕሬስ', price: '$65' }
          ]
        }
      ]
    },
    testimonials: {
      eyebrow: 'ምስክሮች',
      title: 'የአዳራሾቻችን ምን ይላሉ',
      subtitle: 'ከተወዳጆቻችን እውነተኛ ልምዶች።',
      items: [
        {
          text: 'ፊፊ ተፈጥሮ ጸጉርን በእውነት ይረዳል። የእኔ ተፈጥሮ ጸጉር ከዚህ በፊት እንደዚህ አልተስማማም!',
          author: 'ሳራ ጆንሰን',
          role: 'የተፈጥሮ ጸጉር አዳራሽ'
        },
        {
          text: 'ብሬዶቹ በጣም ንጹህ ናቸው እና ለሁለት ወር ቆይተዋል። በጣም እመክራለሁ!',
          author: 'አይሻ ዊሊያምስ',
          role: 'የመከላከያ ዘዴ አዳራሽ'
        },
        {
          text: 'በመጨረሻ የተፈጥሮ ጸጉሬን የሚያስከብር ሳሎን አገኘሁ። እዚህ እወዳለሁ!',
          author: 'ማያ ዴቪስ',
          role: 'የተለመደ አዳራሽ'
        }
      ]
    },
    contact: {
      eyebrow: 'አግኙን',
      title: 'ያግኙን',
      subtitle: 'ለተፈጥሮ ጸጉር እንክብካቤ እና የመከላከያ ዘዴዎች የታመነ ሳሎንዎ።',
      form: {
        firstName: 'የመጀመሪያ ስም',
        lastName: 'የአባት ስም',
        email: 'ኢሜይል',
        phone: 'ስልክ',
        message: 'መልዕክት',
        sendButton: 'መልዕክት ላክ'
      },
      info: {
        address: '123 ዋና ጎዳና፣ ከተማ፣ ክልል 12345',
        phone: '(555) 123-4567',
        email: 'info@fifihairsalon.com',
        hours: 'ሰኞ-ሰንበት፡ 9፡00-7፡00፣ እሁድ፡ 10፡00-5፡00'
      }
    },
    footer: {
      cta: 'የተፈጥሮ ውበትዎን ለመቀበል ዝግጁ ነዎት?',
      ctaButton: 'ጥበቃ ያስቀምጡ',
      copyright: '© 2024 ፊፊ የጸጉር ሳሎን። ሁሉም መብቶች የተጠበቁ ናቸው።'
    },
    booking: {
      title: 'የጸጉር ጉዞዎን ያስቀምጡ',
      subtitle: 'የተፈጥሮ ውበትዎን ለመቀበል ዝግጁ ነዎት? አስደናቂ ነገር እንፍጠር።',
      form: {
        firstName: 'የመጀመሪያ ስም',
        lastName: 'የአባት ስም',
        email: 'ኢሜይል',
        phone: 'የስልክ ቁጥር',
        service: 'የአገልግሎት ምርጫ',
        date: 'የሚመርጡት ቀን',
        time: 'የሚመርጡት ሰዓት',
        notes: 'ተጨማሪ ማስታወሻዎች',
        notesPlaceholder: 'ስለ ጸጉር ግቦችዎ፣ ልዩ ጥያቄዎች ወይም ጥያቄዎች ይንገሩን...',
        submit: 'ጥበቃ ያስቀምጡ',
        submitted: 'ጥበቃ ተላከ!',
        successMessage: 'አመሰግናለሁ! የጥበቃ ጥያቄዎን ተቀብለናል እና በ24 ሰዓታት ውስጥ ጥበቃዎን እናረጋግጣለን።',
        required: 'ይህ መስክ ያስፈልጋል',
        invalidEmail: 'እባክዎ ትክክለኛ ኢሜይል አድራሻ ያስገቡ',
        invalidPhone: 'እባክዎ ትክክለኛ የስልክ ቁጥር ያስገቡ',
        pastDate: 'እባክዎ የወደፊት ቀን ይምረጡ'
      }
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      gallery: 'Galería',
      pricing: 'Precios',
      testimonials: 'Testimonios',
      contact: 'Contacto',
      bookAppointment: 'Reservar Cita'
    },
    hero: {
      title: 'Abraza Tu Belleza Natural,\nCelebra Tu Corona',
      subtitle: 'Cuidado experto para cabello natural, estilos protectores y todas las texturas. Donde tu viaje capilar comienza con confianza y autenticidad.',
      bookButton: 'Reserva Tu Cita',
      viewServicesButton: 'Ver Servicios'
    },
    intro: {
      philosophy: 'Nuestra Filosofía',
      title: 'Celebrando la Belleza Natural',
      description: 'En Fifi Hair Salon, celebramos la belleza y diversidad del cabello negro. Nuestros estilistas expertos entienden las necesidades únicas del cabello natural, estilos protectores y todas las texturas. Estamos aquí para empoderar tu viaje capilar con conocimiento, cuidado y belleza auténtica.',
      reserveButton: 'Reserva Tu Lugar'
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Nuestro Menú Completo',
      subtitle: 'Servicios de cuidado capilar profesional adaptados a tus necesidades y estilo únicos.',
      priceNote: 'El precio no incluye cabello',
      categories: [
        {
          name: 'Trenzas y Estilos Protectores',
          items: [
            { name: 'Cornrows Naturales', description: 'Trenzas clásicas para un look atemporal', price: '$45.00 UP' },
            { name: 'Feed In Cornrows', description: 'Cornrows naturales con cabello adicional', price: '$85.00 UP' },
            { name: 'Trenzas Individuales', description: 'Trenzas de caja individuales para longitud y estilo', price: '$165.00 UP' },
            { name: 'Trenzas de Caja Sin Nudos', description: 'Técnica sin nudos suave para comodidad (18 in)', price: '$185.00 UP' },
            { name: 'Trenzas de Diosa', description: 'Trenzas elegantes de diosa para ocasiones especiales', price: '$15.00 UP cada una' },
            { name: 'Trenzas Kinky Twist', description: 'Trenzas con textura para movimiento natural', price: '$145.00 UP' },
            { name: 'Senegalese Twist', description: 'Trenzas suaves y elegantes', price: '$175.00 UP' },
            { name: 'Trenzas de Árbol', description: 'Trenzas naturales con extensiones', price: '$165.00 UP' },
            { name: 'Trenzas Crochet', description: 'Estilo protector rápido y versátil', price: '$100.00 UP' },
            { name: 'Media Cornrows y Media Trenzas de Caja', description: 'Estilo creativo combinado', price: '$125.00 UP' },
            { name: 'Cornrows de Cola de Caballo', description: 'Cornrows elegantes que llevan a cola de caballo', price: '$95.00 UP' }
          ]
        },
        {
          name: 'Dreadlocks y Locs',
          items: [
            { name: 'Dreadlocks', description: 'Instalación profesional de dreadlocks', price: '$85.00 UP' },
            { name: 'Retwist de Dread', description: 'Servicio de mantenimiento y retwist', price: '$65.00 UP' },
            { name: 'Dread Falso', description: 'Estilizado temporal de dreadlocks', price: '$185.00 UP' }
          ]
        },
        {
          name: 'Extensiones y Weaves',
          items: [
            { name: 'Sew In de Weave', description: 'Instalación profesional de weave', price: '$125.00 UP' },
            { name: 'Alisado de Weave', description: 'Servicio de alisado para weaves', price: '$65.00 UP' },
            { name: 'Remoción de Weave', description: 'Remoción segura de weaves cosidos', price: '$35.00 UP' },
            { name: 'Lavado y Peinado de Weave', description: 'Limpieza y estilizado para weaves', price: '$55.00 UP' },
            { name: 'Remoción de Extensiones', description: 'Remoción profesional de extensiones', price: '$35.00 UP' },
            { name: 'Lavado de Extensiones', description: 'Limpieza especializada para extensiones', price: '$25.00 UP' }
          ]
        },
        {
          name: 'Cuidado y Estilizado',
          items: [
            { name: 'Lavado y Peinado', description: 'Lavado y estilizado profesional', price: '$45.00 UP' },
            { name: 'Alisado de Cabello', description: 'Servicio de alisado suave', price: '$55.00 UP' },
            { name: 'Twist de Cabello Natural', description: 'Estilizado de cabello natural con twists', price: '$65.00 UP' },
            { name: 'Tratamiento', description: 'Acondicionamiento profundo y tratamientos capilares', price: '$25.00 UP' },
            { name: 'Recorte', description: 'Recorte y moldeado preciso del cabello', price: '$25.00 UP' },
            { name: 'Remoción de Trenzas Individuales', description: 'Remoción segura de trenzas individuales', price: '$45.00 UP' },
            { name: 'Remoción de Cornrows', description: 'Remoción suave de cornrows', price: '$35.00 UP' }
          ]
        }
      ]
    },
    gallery: {
      eyebrow: 'Galería',
      title: 'Trabajo Reciente',
      subtitle: 'Una mirada a los estilos creados por nuestro equipo.'
    },
    pricing: {
      eyebrow: 'Precios',
      title: 'Paquetes de Servicios',
      subtitle: 'Precios transparentes para todos nuestros servicios.',
      groups: [
        {
          name: 'Cabello Natural',
          items: [
            { name: 'Lavado y Estilo', price: '$35' },
            { name: 'Recorte y Forma', price: '$45' },
            { name: 'Acondicionamiento Profundo', price: '$25' }
          ]
        },
        {
          name: 'Estilos Protectores',
          items: [
            { name: 'Trenzas de Caja (Pequeñas)', price: '$120' },
            { name: 'Trenzas de Caja (Medianas)', price: '$100' },
            { name: 'Cornrows', price: '$60' },
            { name: 'Twists', price: '$80' }
          ]
        },
        {
          name: 'Color y Tratamientos',
          items: [
            { name: 'Consulta de Color', price: '$25' },
            { name: 'Color Completo', price: '$95' },
            { name: 'Mechas', price: '$85' },
            { name: 'Silk Press', price: '$65' }
          ]
        }
      ]
    },
    testimonials: {
      eyebrow: 'Testimonios',
      title: 'Lo Que Dicen Nuestros Clientes',
      subtitle: 'Experiencias reales de nuestros clientes valorados.',
      items: [
        {
          text: 'Fifi realmente entiende el cabello natural. ¡Mis rizos nunca se han visto mejor!',
          author: 'Sarah Johnson',
          role: 'Cliente de Cabello Natural'
        },
        {
          text: 'Las trenzas están tan ordenadas y duraron meses. ¡Altamente recomendado!',
          author: 'Aisha Williams',
          role: 'Cliente de Estilo Protector'
        },
        {
          text: 'Finalmente encontré un salón que celebra mi textura natural. ¡Me encanta aquí!',
          author: 'Maya Davis',
          role: 'Cliente Regular'
        }
      ]
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Ponte en Contacto',
      subtitle: 'Tu salón de confianza para el cuidado del cabello natural y estilos protectores.',
      form: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo Electrónico',
        phone: 'Teléfono',
        message: 'Mensaje',
        sendButton: 'Enviar Mensaje'
      },
      info: {
        address: '123 Calle Principal, Ciudad, Estado 12345',
        phone: '(555) 123-4567',
        email: 'info@fifihairsalon.com',
        hours: 'Lun-Sáb: 9AM-7PM, Dom: 10AM-5PM'
      }
    },
    footer: {
      cta: '¿Lista para abrazar tu belleza natural?',
      ctaButton: 'Reserva Tu Cita',
      copyright: '© 2024 Fifi Hair Salon. Todos los derechos reservados.'
    },
    booking: {
      title: 'Reserva Tu Viaje Capilar',
      subtitle: '¿Lista para abrazar tu belleza natural? Creemos algo increíble juntas.',
      form: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo Electrónico',
        phone: 'Número de Teléfono',
        service: 'Selección de Servicio',
        date: 'Fecha Preferida',
        time: 'Hora Preferida',
        notes: 'Notas Adicionales',
        notesPlaceholder: 'Cuéntanos sobre tus objetivos capilares, solicitudes específicas o preguntas que tengas...',
        submit: 'Reservar Cita',
        submitted: '¡Cita Enviada!',
        successMessage: '¡Gracias! Hemos recibido tu solicitud de cita y confirmaremos tu cita dentro de 24 horas.',
        required: 'Este campo es requerido',
        invalidEmail: 'Por favor ingresa una dirección de correo válida',
        invalidPhone: 'Por favor ingresa un número de teléfono válido',
        pastDate: 'Por favor selecciona una fecha futura'
      }
    }
  }
}
