import { Hero } from '@/components/sections/Hero'
import { Manifiesto } from '@/components/sections/Manifiesto'
import { Areas } from '@/components/sections/Areas'
import { Proceso } from '@/components/sections/Proceso'
import { Alcance } from '@/components/sections/Alcance'
import { Estudio } from '@/components/sections/Estudio'
import { Faq } from '@/components/sections/Faq'
import { Contacto } from '@/components/sections/Contacto'
import { jsonLdFaq, jsonLdScript } from '@/lib/jsonld'

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLdFaq()) }}
      />
      <Hero />
      <Manifiesto />
      <Areas />
      <Proceso />
      <Alcance />
      <Estudio />
      <Faq />
      <Contacto />
    </>
  )
}
