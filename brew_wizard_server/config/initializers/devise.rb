Devise.setup do |config|
  config.secret_key = '74fc66ba4f79c3208882dfc2ee96ed37daa0b94749a062d89d81785502d0cd01fb8631cf29760d90312c1a5862a66e48681d2ebbf00a2abb4ee78f88cf81d468'

  config.reset_password_within = 6.hours

  config.mailer_sender = "noreply@BuildA.Beer"
end
