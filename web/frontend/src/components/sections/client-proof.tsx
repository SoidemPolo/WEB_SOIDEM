import Image from "next/image";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Reveal } from "@/components/ui/reveal";

type Logo = { alt: string; src: string; w: number; h: number };

const W = "https://static.wixstatic.com/media";

/** Logos de clientes, con las mismas URL y dimensiones que la web actual. */
const LOGOS: Logo[] = [
  { alt: "Texia", w: 155, h: 59, src: `${W}/1e5c2d_2bf84afa1a074cc999a08033a5b2d289~mv2.png/v1/fill/w_155,h_59,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/texia.png` },
  { alt: "Vitae", w: 146, h: 69, src: `${W}/1e5c2d_9cc5b290ee9e43acac6fde4f45cc3a2f~mv2.png/v1/fill/w_146,h_69,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/vitae.png` },
  { alt: "Cliente de SOIDEM", w: 134, h: 48, src: `${W}/1e5c2d_62d61161ebd24d07bade375516c30ef4~mv2.png/v1/fill/w_134,h_48,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_62d61161ebd24d07bade375516c30ef4~mv2.png` },
  { alt: "Filinox", w: 146, h: 29, src: `${W}/1e5c2d_624eb0999f85410ebee86fa75c799081~mv2.png/v1/fill/w_146,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Filinox_logotipo.png` },
  { alt: "Cliente de SOIDEM", w: 155, h: 40, src: `${W}/1e5c2d_4bf976a5c37e4629ba886f37d55c68f3~mv2.png/v1/fill/w_155,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_4bf976a5c37e4629ba886f37d55c68f3~mv2.png` },
  { alt: "Sedatex", w: 92, h: 65, src: `${W}/1e5c2d_3273b32c521b4fe7b2fa02a2dcc37233~mv2.png/v1/crop/x_0,y_158,w_1080,h_763/fill/w_92,h_65,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/sedatex.png` },
  { alt: "Continental", w: 176, h: 29, src: `${W}/1e5c2d_a6d388cab5eb45f6b78d1bb386c2e39c~mv2.png/v1/fill/w_176,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/CONTI.png` },
  { alt: "Cliente de SOIDEM", w: 130, h: 68, src: `${W}/1e5c2d_34b262a9e1594a0fab5c615542cc14d7~mv2.png/v1/fill/w_130,h_68,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_34b262a9e1594a0fab5c615542cc14d7~mv2.png` },
  { alt: "Calier", w: 176, h: 59, src: `${W}/1e5c2d_1136bad52e0a4dde99be6f88349e5d99~mv2.png/v1/fill/w_176,h_59,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/calier_Indu.png` },
  { alt: "Byly", w: 130, h: 34, src: `${W}/1e5c2d_697e6f4adbe640cd9fe2fb356d17a0b3~mv2.jpg/v1/fill/w_130,h_34,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/byly.jpg` },
  { alt: "Cliente de SOIDEM", w: 109, h: 50, src: `${W}/1e5c2d_4127139539a24144864d853459969fba~mv2.png/v1/fill/w_109,h_50,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_4127139539a24144864d853459969fba~mv2.png` },
  { alt: "Panificadora", w: 155, h: 65, src: `${W}/1e5c2d_98c19b7a00d347c78fc2a2d2a5ef2d54~mv2.png/v1/fill/w_155,h_65,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo-panificadora_2x.png` },
  { alt: "Ceibo", w: 138, h: 34, src: `${W}/1e5c2d_505330f2bb62449689840020da180872~mv2.png/v1/fill/w_138,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ceibo.png` },
  { alt: "BTS Group", w: 162, h: 32, src: `${W}/1e5c2d_9459b3d7bde447c382677bc9d451b1a1~mv2.png/v1/fill/w_162,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bts.png` },
  { alt: "Cliente de SOIDEM", w: 109, h: 64, src: `${W}/1e5c2d_07846d1f8fae49f28a532f5f20f1ec66~mv2.png/v1/fill/w_109,h_64,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_07846d1f8fae49f28a532f5f20f1ec66~mv2.png` },
  { alt: "Casa Mas", w: 96, h: 89, src: `${W}/1e5c2d_557f15a2a21a42fe833193f1d0ef1f68~mv2.png/v1/fill/w_96,h_89,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_557f15a2a21a42fe833193f1d0ef1f68~mv2.png` },
  { alt: "Cliente de SOIDEM", w: 109, h: 70, src: `${W}/1e5c2d_6fc009e507be43a1aff6dc38050ac70c~mv2.png/v1/fill/w_109,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1e5c2d_6fc009e507be43a1aff6dc38050ac70c~mv2.png` },
  { alt: "Qualix Pharma", w: 162, h: 32, src: `${W}/1e5c2d_915ab23011624678acb9aa262c168dc9~mv2.png/v1/fill/w_162,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/QUALIX-LOGO.png` },
];

export function ClientProof() {
  return (
    <section
      aria-labelledby="client-proof-title"
      className="bg-ink pb-[62px] pt-[58px] text-[#F2F1EC] md:pb-[78px] md:pt-[72px]"
    >
      <div className="wrap">
        <Reveal>
          <div className="grid items-end gap-[18px] lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            <div>
              <p className="kicker text-[#8FB2BA]">Confían en SOIDEM</p>
              <h2
                id="client-proof-title"
                className="max-w-[18ch] text-[clamp(28px,3.2vw,42px)] text-white"
              >
                Experiencia real en empresas con operaciones exigentes.
              </h2>
            </div>
            <p className="max-w-[46ch] text-[17px] text-[#B9BEB9] lg:justify-self-end">
              Pharma, alimentación, textil, automoción, metalurgia y otros entornos
              donde conectar bien la operación importa.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="group"
            aria-label="Empresas que confían en SOIDEM"
            className="logo-slider mt-[34px]"
          >
            <InfiniteSlider gap={1} duration={45} durationOnHover={160}>
              {LOGOS.map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="grid min-h-[74px] w-[132px] shrink-0 place-items-center bg-white px-3 py-[15px]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={logo.h}
                    className="h-auto max-h-[30px] w-auto max-w-[84%] object-contain opacity-[0.72] grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
