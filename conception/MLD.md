
pathology ( id, name )

product ( id, product_name, expiration_date, quantity, price, 
    composition, dosage_form, cis_code, #user(id), #pathology(id) )

user ( id, user_type, organization_name, rpps, finess, adeli, email,
    password, phone_number, address, city, region, postal_code ) 

order ( id, order_number, status, date, #user(id))

notification ( id, message, date, #order(id), #user(id) )

product HAS order ( #product(id), #order(id) )
