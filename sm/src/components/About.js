import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import logoAbout from '../logo-about.png'

export default function About() {
  return (
    <div style={{backgroundColor:'#f7f7f7fe',height:'100vh'}}>
      <Card sx={{marginBottom:'10px'}}>
        <CardContent style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#305252'}}>
        <img  src={logoAbout} alt='' style={{ mr: 1 ,width:'250px',marginRight:'20px'}} />
        </CardContent>
      </Card>
    <Card>
      <CardContent>
      
        <Typography sx={{ fontSize: 18,direction:'rtl',textAlign:'right' }} color="text.secondary" gutterBottom>
          مشروع موقع ترميز الاجتماعي كان بالأساس جزء من دورة جافاسكريبت متقدمة قام بتقديمها
          الأستاذ يعرب المصطفى من خلال قناته ترميز على يوتيوب وقدم قام بتنفيذه
          من خلال جافاسكريبت لوحدها من دون اطار عمل مع مكتبة BootStrap .<br /> والذي
          حدث بعدها أنني تابعت دورة رياكت للأستاذ يعرب وأردت أن أقوم بتطبيق عملي
          لما تعلمته خلال الدورة ووجدت أن مشروع موقع ترميز الاجتماعي ملائم جداً لهذا الغرض
          ويشكل تحدي كبير بالنسبة لي كونه بالأصل مكتوب بلغة جافاسكريبت فقط كما
          أسلفت.<br /> لذلك قمت بكتابة كود مشروع ترميز بوك عن طريق اطار عمل رياكت
          ومكتبة الواجهات MUI.<br /> في الرابط هنا تجد الكود المصدري للمشروع ويسعدني أن ترسل
          لي أي ملاحظات أو مقترحات تطويرية على الايميل : amer@amerhariri.com <br />
          جزيل الشكر للأستاذ يعرب على دورة الرياكت وعلى تقديمه API المشروع.
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}
