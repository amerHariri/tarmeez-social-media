import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import logoAbout from "../logo-about.png";
import twitterLogo from "../twitter.png";
import wordpressLogo from "../wordpress-logo.png";

export default function About() {
  return (
    <div style={{ backgroundColor: "#f7f7f7fe", height: "100vh" }}>
      <Card sx={{ marginBottom: "10px" }}>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#305252",
          }}
        >
          <img
            src={logoAbout}
            alt=""
            style={{ mr: 1, width: "250px", marginRight: "20px" }}
          />
        </CardContent>
      </Card>
      <Card sx={{marginBottom:'10px'}}>
        <CardContent>
          <Typography
            sx={{ fontSize: 18, direction: "rtl", textAlign: "right" }}
            color="text.secondary"
            gutterBottom
          >
            أنا <a href="https://amerhariri.com/" target="_blank" rel="noreferrer">عامر حريري</a> وهذا مشروع موقع ترميز الاجتماعي كان بالأساس جزء من دورة جافاسكريبت متقدمة
            قام بتقديمها الأستاذ يعرب المصطفى من خلال قناته{" "}
            <a
              href="https://www.youtube.com/watch?v=pPnfmpj_MSQ&list=PLYyqC4bNbCIdvviLNbvYKfvHqszFPnUkj"
              target="_blank" rel="noreferrer"
            >
              ترميز
            </a>{" "}
            على يوتيوب وقدم قام بتنفيذه من خلال جافاسكريبت لوحدها من دون اطار
            عمل مع مكتبة BootStrap .<br /> والذي حدث بعدها أنني تابعت{" "}
            <a
              href="https://www.udemy.com/course/tarmeezacademy-react/"
              target="_blank" rel="noreferrer"
            >
              دورة رياكت
            </a>{" "}
            للأستاذ يعرب وأردت أن أقوم بتطبيق عملي لما تعلمته خلال الدورة ووجدت
            أن مشروع موقع ترميز الاجتماعي ملائم جداً لهذا الغرض ويشكل تحدي كبير
            بالنسبة لي كونه بالأصل مكتوب بلغة جافاسكريبت فقط كما أسلفت.
            <br /> لذلك قمت بكتابة كود مشروع موقع ترميز الاجتماعي عن طريق اطار عمل رياكت
            ومكتبة الواجهات MUI.
            <br /> في الرابط{" "}
            <a
              href="https://github.com/amerHariri/tarmeez-social-media/tree/main"
              target="_blank" rel="noreferrer"
            >
              هنا
            </a>{" "}
            تجد الكود المصدري للمشروع ويسعدني أن ترسل لي أي ملاحظات أو مقترحات
            تطويرية على الايميل : amer@amerhariri.com <br />
            جزيل الشكر للأستاذ يعرب على دورة الرياكت وعلى تقديمه API المشروع.
          </Typography>
        </CardContent>
      </Card>

      <Card >
        <CardContent style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <a href="https://twitter.com/Amer_Hariri" target="_blank" rel="noreferrer"><img href='https://twitter.com/Amer_Hariri' src={twitterLogo} alt='' style={{ mr: 1 ,width:'40px',marginRight:'10px'}} /></a>
          <a href="https://thingfromuntil.com/" target="_blank" rel="noreferrer"><img href='https://twitter.com/Amer_Hariri' src={wordpressLogo} alt='' style={{ mr: 1 ,width:'40px'}} /></a>
        </CardContent>
      </Card>
    </div>
  );
}
