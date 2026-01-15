// Campus data for all 17 Epitech campuses across Europe
export interface Campus {
  code: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  color: string;
}

export const campuses: Campus[] = [
  { code: "PAR", name: "Paris", city: "Paris", country: "France", flag: "🇫🇷", color: "#0066CC" },
  { code: "LYO", name: "Lyon", city: "Lyon", country: "France", flag: "🇫🇷", color: "#FF6B35" },
  { code: "MAR", name: "Marseille", city: "Marseille", country: "France", flag: "🇫🇷", color: "#2ECC71" },
  { code: "BOR", name: "Bordeaux", city: "Bordeaux", country: "France", flag: "🇫🇷", color: "#9B59B6" },
  { code: "LIL", name: "Lille", city: "Lille", country: "France", flag: "🇫🇷", color: "#E74C3C" },
  { code: "NAN", name: "Nantes", city: "Nantes", country: "France", flag: "🇫🇷", color: "#F39C12" },
  { code: "REN", name: "Rennes", city: "Rennes", country: "France", flag: "🇫🇷", color: "#1ABC9C" },
  { code: "STR", name: "Strasbourg", city: "Strasbourg", country: "France", flag: "🇫🇷", color: "#34495E" },
  { code: "TOU", name: "Toulouse", city: "Toulouse", country: "France", flag: "🇫🇷", color: "#E67E22" },
  { code: "NIC", name: "Nice", city: "Nice", country: "France", flag: "🇫🇷", color: "#3498DB" },
  { code: "BER", name: "Berlin", city: "Berlin", country: "Germany", flag: "🇩🇪", color: "#16A085" },
  { code: "BAR", name: "Barcelona", city: "Barcelona", country: "Spain", flag: "🇪🇸", color: "#C0392B" },
  { code: "BRU", name: "Brussels", city: "Brussels", country: "Belgium", flag: "🇧🇪", color: "#8E44AD" },
  { code: "LIS", name: "Lisbon", city: "Lisbon", country: "Portugal", flag: "🇵🇹", color: "#D35400" },
  { code: "AMS", name: "Amsterdam", city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", color: "#27AE60" },
  { code: "MIL", name: "Milan", city: "Milan", country: "Italy", flag: "🇮🇹", color: "#2980B9" },
  { code: "ZUR", name: "Zurich", city: "Zurich", country: "Switzerland", flag: "🇨🇭", color: "#C23616" },
];

export const getCampusByCode = (code: string): Campus | undefined => {
  return campuses.find(c => c.code === code);
};
