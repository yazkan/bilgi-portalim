import { Button } from "primereact/button";
import "primeflex/primeflex.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-5 p-6 text-center md:text-left flex align-items-center">
          <section>
            <span className="block text-6xl font-bold mb-1">
              Hedeflerinize ulaşmak için
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              Bilgi Portalım ile çalışın
            </div>
            <p className="mt-0 mb-4 text-700 line-height-3">
              Öğrencilerimizi ve öğretmenlerimizi tek portalda bir araya
              getiriyoruz. Bütün kaynaklarınızı bir yerden yönetin.
            </p>
            <Link to="/register">
              <Button
                label="Kayıt Ol"
                type="button"
                className="mr-3 p-button-raised"
              />
            </Link>
            <Link to="/login">
              <Button
                label="Giriş Yap"
                type="button"
                className="p-button-outlined"
              />
            </Link>
          </section>
        </div>

        <div className="col-12 md:col-7 overflow-hidden">
          <img
            src="/hero.jpg"
            className="block md:h-screen w-full"
            style={{
              objectFit: "cover",
              height: "100vh",
              clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
