import { Box } from "@mui/material";
import { Candledecoration, CandleProps } from "./candle";
import DrawCircle from "./circle-animate";
import  { MotionUnderline } from "./animate-line";
import DrawArrow from "./arrow-animate";
import { FloatingNumbersLayer } from "./float-layer";

const marketSlice: Omit<CandleProps, "width" | "height">[] = [
  // ===== 1–12: Попередня ситуація — конслідація + "хвіст кенгуру" + пробій вгору =====

  // 1–4: плавний ап-тренд у верхньому діапазоні
  { high: 0.46, low: 0.7, open: 0.68, close: 0.54, direction: "up" },
  { high: 0.44, low: 0.68, open: 0.66, close: 0.5, direction: "up" },
  { high: 0.42, low: 0.66, open: 0.58, close: 0.6, direction: "down" },
  { high: 0.44, low: 0.64, open: 0.56, close: 0.58, direction: "down" },

  // 5: "хвіст кенгуру" — довгий нижній хвіст, повернення ціни назад у діапазон
  { high: 0.46, low: 0.96, open: 0.7, close: 0.52, direction: "up" },

  // 6–8: підтвердження відкупу, ще трохи коливань у діапазоні
  { high: 0.4, low: 0.6, open: 0.58, close: 0.48, direction: "up" },
  { high: 0.42, low: 0.64, open: 0.6, close: 0.62, direction: "down" },
  { high: 0.5, low: 0.72, open: 0.62, close: 0.58, direction: "up" },

  // 9–12: вихід з діапазону вгору
  { high: 0.36, low: 0.6, open: 0.58, close: 0.46, direction: "up" },
  { high: 0.34, low: 0.58, open: 0.54, close: 0.44, direction: "up" },
  { high: 0.44, low: 0.56, open: 0.5, close: 0.48, direction: "up" },
  { high: 0.46, low: 0.55, open: 0.52, close: 0.54, direction: "down" },

  // ===== 13–24: Поточна ситуація — фейковий пробій і розворот тренду =====

  // 13–16: агресивний ап-тренд
  { high: 0.62, low: 0.78, open: 0.76, close: 0.66, direction: "up" }, // сильна зелена
  { high: 0.56, low: 0.72, open: 0.7, close: 0.58, direction: "up" }, // ще одна
  { high: 0.5, low: 0.66, open: 0.64, close: 0.52, direction: "up" }, // майже без хвоста вниз
  { high: 0.44, low: 0.6, open: 0.58, close: 0.46, direction: "up" }, // кульмінація

  // 17: ключова, але “не дуже помітна” причина — довгий верхній хвіст
  { high: 0.34, low: 0.5, open: 0.48, close: 0.47, direction: "up" }, // майже дожі, хвіст вгору

  // 18–19: сила покупців зникає, з’являються червоні свічки біля хайів
  { high: 0.38, low: 0.54, open: 0.46, close: 0.52, direction: "down" }, // невеликий відкат
  { high: 0.4, low: 0.58, open: 0.5, close: 0.56, direction: "down" }, // ще трохи вниз

  // 20–21: локальна “надія” — але без нового максимуму (lower high)
  { high: 0.42, low: 0.56, open: 0.56, close: 0.48, direction: "up" }, // зелена, але не пробиває high 5-ї
  { high: 0.44, low: 0.6, open: 0.5, close: 0.55, direction: "down" }, // продавці знову давлять

  // 22: раптовий обвал — пролом підтримки
  { high: 0.56, low: 0.8, open: 0.58, close: 0.78, direction: "down" }, // велика червона

  // 23–24: підтвердження зміни настрою
  { high: 0.64, low: 0.84, open: 0.76, close: 0.82, direction: "down" }, // продавці тримають контроль
  { high: 0.68, low: 0.88, open: 0.82, close: 0.86, direction: "down" }, // тренд уже явно вниз

  // ===== 25–36: Після ситуації — паніка, потім базування і спроба розвороту =====

  // 25–28: добивання вниз + перший відкуп
  { high: 0.7, low: 0.94, open: 0.84, close: 0.92, direction: "down" }, // ще одна хвиля паніки
  { high: 0.72, low: 0.96, open: 0.9, close: 0.82, direction: "up" }, // довгий нижній хвіст, відкуп
  { high: 0.68, low: 0.9, open: 0.86, close: 0.8, direction: "up" }, // продовження відскоку
  { high: 0.66, low: 0.88, open: 0.8, close: 0.84, direction: "down" }, // пауза після відскоку

  // 29–32: широка консолідація внизу, формування бази
  { high: 0.68, low: 0.9, open: 0.84, close: 0.86, direction: "down" },
  { high: 0.7, low: 0.92, open: 0.88, close: 0.86, direction: "up" },
  { high: 0.72, low: 0.94, open: 0.9, close: 0.89, direction: "up" },
  { high: 0.7, low: 0.92, open: 0.88, close: 0.89, direction: "down" },

  // 33–36: вихід з бази вгору (потенційний розворот глобального тренду)
  { high: 0.66, low: 0.9, open: 0.86, close: 0.78, direction: "up" },
  { high: 0.64, low: 0.88, open: 0.82, close: 0.74, direction: "up" },
  { high: 0.62, low: 0.86, open: 0.78, close: 0.72, direction: "up" },
  { high: 0.64, low: 0.88, open: 0.74, close: 0.76, direction: "down" },
];

const CHART_HEIGHT = 420; 



const MarketSlicePreview: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: "656px",
        maxHeight: "600px",
        width: "100%",
        color: "#E5E7EB",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Карточка з графіком */}
      <Box
        sx={{
          mx: "auto",
          width: { xs: "100%", md: "70vw" },
          maxWidth: "100%",
          height: { xs: "60vh", md: "70vh" },
          border: "1px solid rgba(255,255,255,0.12)",
          backgroundColor: "#050505",
          position: "relative",
          overflow: "hidden", // 🔒 нічого не вилазить за бокс
          p: 3,
        }}
      >
        {/* Фон-сітка */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(207, 207, 207, 1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(207, 207, 207, 1) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        <FloatingNumbersLayer />

        {/* Самі свічки */}
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.4,          // відстань між свічками
            px: 2,
            pb: 2,
          }}
        >
          {marketSlice.map((candle, index) => (
            <Candledecoration
              key={index}
              width={10}            // 🔹 вужчі свічки
              height={CHART_HEIGHT} // 🔹 високі свічки
              high={candle.high}
              low={candle.low}
              open={candle.open}
              close={candle.close}
              direction={candle.close >= candle.open ? "up" : "down"}
            />
          ))}

          <DrawArrow rotate='-25deg' top='+30%' left='+10%'/>
          <DrawArrow rotate='180deg' top='+85%' left='+15%'/>
          <DrawCircle top='+30%' left='+40%' size={100} isAbsolute={true}/>
          <MotionUnderline length={200} top='+60%' left='+65%'/>
          <MotionUnderline length={200} top='+80%' left='+65%'/>
        </Box>
      </Box>
    </Box>
  );
};
export default MarketSlicePreview;
