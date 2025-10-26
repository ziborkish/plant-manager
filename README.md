# 🌱 Plant Manager

**Plant Manager** ir neliela viedā tīmekļa lietotne, kas palīdz sekot līdzi tavu augu laistīšanas grafikam.  
Tā mācās no taviem ieradumiem, analizē, cik bieži tu aplaisti katru augu, un ar laiku precīzāk iesaka, kad būtu laiks tos atkal laistīt.

---

## 🧩 Funkcionalitāte

- 🌿 **Augu saraksts** – katrs augs redzams ar nosaukumu, statusu un pēdējo laistīšanas laiku.  
- 💧 **Laistīšanas reģistrēšana** – ar vienu klikšķi atzīmē, ka augs ir aplaistīts.  
- ⏱️ **Automātiska mācīšanās** – sistēma aprēķina vidējo intervālu starp laistīšanām un pielāgo ieteikumus.  
- 📊 **Statusa krāsas**:
  - 🟩 **OK** – augs laistīts nesen; viss kārtībā.  
  - 🟧 **Vēlams aplaistīt** – tuvojas ieteicamais intervāls.  
  - 🟥 **Jālaista** – augs nav laistīts pārāk ilgi.  
- 💾 **Datu saglabāšana** – visa informācija tiek glabāta lokāli pārlūkā (localStorage).  
- ⬆️⬇️ **Datu eksports un imports** – iespējams saglabāt datus kā `.json` failu un vēlāk tos atjaunot.  

---

## 🖥️ Tehnoloģijas

- **HTML5** – struktūra  
- **CSS3** – tīrs, pielāgots dizains bez ietvariem  
- **JavaScript (ES6)** – loģika, datu apstrāde un localStorage vadība  
- **Bez servera puses** – viss darbojas tieši pārlūkā (ideāli priekš `localhost` vai statiskas hostēšanas)

---

## 🚀 Uzstādīšana un palaišana

1. Lejupielādē vai klonē repozitoriju:
   ```bash
   git clone https://github.com/ziborkish/plant-manager.git
