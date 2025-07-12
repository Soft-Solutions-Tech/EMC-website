import React from "react";
import { clients } from "../../../data/clients";
import { partners } from "../../../data/partners";

const ClientsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.02)_1px,transparent_0)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Partners Section */}
        {partners.length > 0 && (
          <>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-teal-50 text-teal rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
                Strategic Partners
              </div>
              <div className="mb-12 sm:mb-16 lg:mb-4 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2">
                  Our Partners
                </h2>
                <div className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md" />
              </div>
              <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mt-0 leading-relaxed font-semibold">
                Collaborative partners driving innovation and growth through shared expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {partners.map((partner, index) => (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-navy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                  <div className="relative z-10 p-8">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="h-16 w-16 object-contain mr-4 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-navy group-hover:text-teal transition-colors">
                          {partner.name}
                        </h3>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-teal to-navy mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors">
                      {partner.brief}
                    </p>

                    {partner.subCompanies &&
                      partner.subCompanies.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-secondary">
                          <h4 className="text-sm font-semibold text-teal mb-4 uppercase tracking-wider">
                            Portfolio Companies
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {partner.subCompanies.map((sub, subIndex) => (
                              <div
                                key={sub.id}
                                className="flex items-center p-3 rounded-lg bg-secondary-bg-40 hover:bg-teal-100 transition-colors duration-200"
                                style={{
                                  animationDelay: `${index * 150 + subIndex * 100
                                    }ms`,
                                }}
                              >
                                <div className="relative">
                                  <img
                                    src={sub.logo}
                                    alt={`${sub.name} logo`}
                                    className="h-8 w-8 object-contain mr-3"
                                  />
                                  <div className="absolute -inset-1 bg-gradient-to-r from-teal to-navy rounded-full opacity-0 hover:opacity-10 transition-opacity duration-200"></div>
                                </div>
                                <span className="text-sm font-medium text-foreground hover:text-navy transition-colors">
                                  {sub.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Clients Section */}
        {clients.length > 0 && (
          <>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-teal-50 text-teal rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
                Valued Clients
              </div>
              <div className="mb-12 sm:mb-16 lg:mb-4 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-navy leading-[1.15] pb-2">
                  Our Clients
                </h2>
                <div className="mt-4 mx-auto h-1 w-24 bg-accent rounded-full shadow-accent shadow-md" />
              </div>
              <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mt-0 leading-relaxed font-semibold">
                Trusted clients we empower with tailored solutions and exceptional service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {clients.map((client, index) => (
                <a
                  key={client.id}
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-navy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                  <div className="relative z-10 p-8">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="h-16 w-16 object-contain mr-4 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-navy group-hover:text-teal transition-colors">
                          {client.name}
                        </h3>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-teal to-navy mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors">
                      {client.brief}
                    </p>

                    {client.subCompanies && client.subCompanies.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-secondary">
                        <h4 className="text-sm font-semibold text-teal mb-4 uppercase tracking-wider">
                          Portfolio Companies
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {client.subCompanies.map((sub, subIndex) => (
                            <a
                              key={sub.id}
                              href={sub.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 rounded-lg bg-secondary-bg-40 hover:bg-teal-100 transition-colors duration-200"
                              style={{
                                animationDelay: `${index * 150 + subIndex * 100
                                  }ms`,
                              }}
                            >
                              <div className="relative">
                                <img
                                  src={sub.logo}
                                  alt={`${sub.name} logo`}
                                  className="h-8 w-8 object-contain mr-3"
                                />
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal to-navy rounded-full opacity-0 hover:opacity-10 transition-opacity duration-200"></div>
                              </div>
                              <span className="text-sm font-medium text-foreground hover:text-navy transition-colors">
                                {sub.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
