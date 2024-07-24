Taller Especializado de Node.js
Proyecto Final

Requerimientos
Como proyecto final se solicita la creación de un sistema que permite dar solución al siguiente
escenario planteado:

El departamento de recursos humanos de la empresa Taller de Node.js S.A. de C.V. actualmente
almacena en un documento de Excel los datos de sus empleados. De cada empleado almacenan:
nombre, apellidos, teléfono, correo electrónico y dirección. Recientemente, debido a una brecha de
seguridad, perdieron varios registros por lo que buscan un sistema que les permita realizar la
administración de los empleados (altas, bajas, consultas y cambios) únicamente a ciertos usuarios
dados de alta en el sistema.

Se solicita que el sistema permita cuente con las siguientes características:

1. Deberá de contar con un apartado de inicio de sesión que únicamente permita el ingreso a
usuarios dados de alta directamente en la base de datos.
2. Deberá de ser implementado utilizando el framework Express.js.
3. Deberá de contar con autenticación por JWT.
4. El sistema debe de asegurarse que únicamente los usuarios autenticados tengan acceso a
la información.
5. Los usuarios dados de alta directamente en la base de datos serán administradores del
sistema y ellos podrán realizar las siguientes acciones:
• Agregar empleados a la base de datos.
• Modificar datos de los empleados.
• Eliminar empleados de la base de datos.
• Buscar empleados por su nombre.