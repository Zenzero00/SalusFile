PGDMP  '                    }         	   salusfile    16.2    16.2 T    %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    32768 	   salusfile    DATABASE     �   CREATE DATABASE salusfile WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
    DROP DATABASE salusfile;
                postgres    false            �            1259    32821    citas    TABLE     �  CREATE TABLE public.citas (
    id_cita integer NOT NULL,
    id_paciente integer,
    id_medico integer,
    fecha_cita timestamp without time zone NOT NULL,
    estado character varying(20) DEFAULT 'Programada'::character varying,
    notas text,
    CONSTRAINT citas_estado_check CHECK (((estado)::text = ANY ((ARRAY['Programada'::character varying, 'Cancelada'::character varying, 'Completada'::character varying])::text[])))
);
    DROP TABLE public.citas;
       public         heap    postgres    false            �            1259    32820    citas_id_cita_seq    SEQUENCE     �   CREATE SEQUENCE public.citas_id_cita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.citas_id_cita_seq;
       public          postgres    false    222            )           0    0    citas_id_cita_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.citas_id_cita_seq OWNED BY public.citas.id_cita;
          public          postgres    false    221            �            1259    32842 	   consultas    TABLE       CREATE TABLE public.consultas (
    id_consulta integer NOT NULL,
    id_paciente integer,
    id_medico integer,
    fecha_consulta timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    motivo text NOT NULL,
    diagnostico text,
    tratamiento text
);
    DROP TABLE public.consultas;
       public         heap    postgres    false            �            1259    32841    consultas_id_consulta_seq    SEQUENCE     �   CREATE SEQUENCE public.consultas_id_consulta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.consultas_id_consulta_seq;
       public          postgres    false    224            *           0    0    consultas_id_consulta_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.consultas_id_consulta_seq OWNED BY public.consultas.id_consulta;
          public          postgres    false    223            �            1259    32920    detalle_factura    TABLE     �  CREATE TABLE public.detalle_factura (
    id_detalle integer NOT NULL,
    id_factura integer,
    concepto character varying(200) NOT NULL,
    cantidad integer,
    precio_unitario numeric(10,2),
    subtotal numeric(10,2) GENERATED ALWAYS AS (((cantidad)::numeric * precio_unitario)) STORED,
    CONSTRAINT detalle_factura_cantidad_check CHECK ((cantidad > 0)),
    CONSTRAINT detalle_factura_precio_unitario_check CHECK ((precio_unitario >= (0)::numeric))
);
 #   DROP TABLE public.detalle_factura;
       public         heap    postgres    false            �            1259    32919    detalle_factura_id_detalle_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_factura_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.detalle_factura_id_detalle_seq;
       public          postgres    false    228            +           0    0    detalle_factura_id_detalle_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.detalle_factura_id_detalle_seq OWNED BY public.detalle_factura.id_detalle;
          public          postgres    false    227            �            1259    32899    facturacion    TABLE     (  CREATE TABLE public.facturacion (
    id_factura integer NOT NULL,
    id_paciente integer,
    id_consulta integer,
    monto numeric(10,2) NOT NULL,
    fecha_emision timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(20) DEFAULT 'Pendiente'::character varying,
    CONSTRAINT facturacion_estado_check CHECK (((estado)::text = ANY ((ARRAY['Pendiente'::character varying, 'Pagada'::character varying, 'Anulada'::character varying])::text[]))),
    CONSTRAINT facturacion_monto_check CHECK ((monto >= (0)::numeric))
);
    DROP TABLE public.facturacion;
       public         heap    postgres    false            �            1259    32898    facturacion_id_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.facturacion_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.facturacion_id_factura_seq;
       public          postgres    false    226            ,           0    0    facturacion_id_factura_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.facturacion_id_factura_seq OWNED BY public.facturacion.id_factura;
          public          postgres    false    225            �            1259    32951    historial_clinico    TABLE     �   CREATE TABLE public.historial_clinico (
    id_historial integer NOT NULL,
    id_paciente integer,
    enfermedad character varying(200) NOT NULL,
    fecha_diagnostico date NOT NULL,
    tratamiento text,
    notas text
);
 %   DROP TABLE public.historial_clinico;
       public         heap    postgres    false            �            1259    32950 "   historial_clinico_id_historial_seq    SEQUENCE     �   CREATE SEQUENCE public.historial_clinico_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.historial_clinico_id_historial_seq;
       public          postgres    false    232            -           0    0 "   historial_clinico_id_historial_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.historial_clinico_id_historial_seq OWNED BY public.historial_clinico.id_historial;
          public          postgres    false    231            �            1259    32794    medicos    TABLE     �  CREATE TABLE public.medicos (
    id_medico integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    especialidad character varying(100) NOT NULL,
    telefono character varying(15),
    email character varying(100),
    num_colegiado character varying(50) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.medicos;
       public         heap    postgres    false            �            1259    32793    medicos_id_medico_seq    SEQUENCE     �   CREATE SEQUENCE public.medicos_id_medico_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.medicos_id_medico_seq;
       public          postgres    false    218            .           0    0    medicos_id_medico_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.medicos_id_medico_seq OWNED BY public.medicos.id_medico;
          public          postgres    false    217            �            1259    32781 	   pacientes    TABLE     4  CREATE TABLE public.pacientes (
    id_paciente integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    fecha_nacimiento date NOT NULL,
    sexo character varying(20),
    direccion text,
    telefono character varying(15),
    email character varying(100),
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pacientes_sexo_check CHECK (((sexo)::text = ANY ((ARRAY['Masculino'::character varying, 'Femenino'::character varying, 'Otro'::character varying])::text[])))
);
    DROP TABLE public.pacientes;
       public         heap    postgres    false            �            1259    32780    pacientes_id_paciente_seq    SEQUENCE     �   CREATE SEQUENCE public.pacientes_id_paciente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.pacientes_id_paciente_seq;
       public          postgres    false    216            /           0    0    pacientes_id_paciente_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.pacientes_id_paciente_seq OWNED BY public.pacientes.id_paciente;
          public          postgres    false    215            �            1259    32938    recipe    TABLE     �   CREATE TABLE public.recipe (
    id_recipe integer NOT NULL,
    id_consulta integer,
    fecha_emision timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    medicamento character varying(200) NOT NULL
);
    DROP TABLE public.recipe;
       public         heap    postgres    false            �            1259    32937    recipe_id_recipe_seq    SEQUENCE     �   CREATE SEQUENCE public.recipe_id_recipe_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.recipe_id_recipe_seq;
       public          postgres    false    230            0           0    0    recipe_id_recipe_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.recipe_id_recipe_seq OWNED BY public.recipe.id_recipe;
          public          postgres    false    229            �            1259    32806    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(50) NOT NULL,
    id_medico integer,
    email character varying(100) NOT NULL,
    CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['admin'::character varying, 'medico'::character varying, 'recepcionista'::character varying])::text[])))
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    32805    usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_id_usuario_seq;
       public          postgres    false    220            1           0    0    usuarios_id_usuario_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;
          public          postgres    false    219            G           2604    32824    citas id_cita    DEFAULT     n   ALTER TABLE ONLY public.citas ALTER COLUMN id_cita SET DEFAULT nextval('public.citas_id_cita_seq'::regclass);
 <   ALTER TABLE public.citas ALTER COLUMN id_cita DROP DEFAULT;
       public          postgres    false    222    221    222            I           2604    32845    consultas id_consulta    DEFAULT     ~   ALTER TABLE ONLY public.consultas ALTER COLUMN id_consulta SET DEFAULT nextval('public.consultas_id_consulta_seq'::regclass);
 D   ALTER TABLE public.consultas ALTER COLUMN id_consulta DROP DEFAULT;
       public          postgres    false    223    224    224            N           2604    32923    detalle_factura id_detalle    DEFAULT     �   ALTER TABLE ONLY public.detalle_factura ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_factura_id_detalle_seq'::regclass);
 I   ALTER TABLE public.detalle_factura ALTER COLUMN id_detalle DROP DEFAULT;
       public          postgres    false    227    228    228            K           2604    32902    facturacion id_factura    DEFAULT     �   ALTER TABLE ONLY public.facturacion ALTER COLUMN id_factura SET DEFAULT nextval('public.facturacion_id_factura_seq'::regclass);
 E   ALTER TABLE public.facturacion ALTER COLUMN id_factura DROP DEFAULT;
       public          postgres    false    226    225    226            R           2604    32954    historial_clinico id_historial    DEFAULT     �   ALTER TABLE ONLY public.historial_clinico ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_clinico_id_historial_seq'::regclass);
 M   ALTER TABLE public.historial_clinico ALTER COLUMN id_historial DROP DEFAULT;
       public          postgres    false    232    231    232            D           2604    32797    medicos id_medico    DEFAULT     v   ALTER TABLE ONLY public.medicos ALTER COLUMN id_medico SET DEFAULT nextval('public.medicos_id_medico_seq'::regclass);
 @   ALTER TABLE public.medicos ALTER COLUMN id_medico DROP DEFAULT;
       public          postgres    false    218    217    218            B           2604    32784    pacientes id_paciente    DEFAULT     ~   ALTER TABLE ONLY public.pacientes ALTER COLUMN id_paciente SET DEFAULT nextval('public.pacientes_id_paciente_seq'::regclass);
 D   ALTER TABLE public.pacientes ALTER COLUMN id_paciente DROP DEFAULT;
       public          postgres    false    216    215    216            P           2604    32941    recipe id_recipe    DEFAULT     t   ALTER TABLE ONLY public.recipe ALTER COLUMN id_recipe SET DEFAULT nextval('public.recipe_id_recipe_seq'::regclass);
 ?   ALTER TABLE public.recipe ALTER COLUMN id_recipe DROP DEFAULT;
       public          postgres    false    230    229    230            F           2604    32809    usuarios id_usuario    DEFAULT     z   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);
 B   ALTER TABLE public.usuarios ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    220    219    220                      0    32821    citas 
   TABLE DATA           [   COPY public.citas (id_cita, id_paciente, id_medico, fecha_cita, estado, notas) FROM stdin;
    public          postgres    false    222   9n                 0    32842 	   consultas 
   TABLE DATA           z   COPY public.consultas (id_consulta, id_paciente, id_medico, fecha_consulta, motivo, diagnostico, tratamiento) FROM stdin;
    public          postgres    false    224   �n                 0    32920    detalle_factura 
   TABLE DATA           f   COPY public.detalle_factura (id_detalle, id_factura, concepto, cantidad, precio_unitario) FROM stdin;
    public          postgres    false    228   o                 0    32899    facturacion 
   TABLE DATA           i   COPY public.facturacion (id_factura, id_paciente, id_consulta, monto, fecha_emision, estado) FROM stdin;
    public          postgres    false    226   0o       "          0    32951    historial_clinico 
   TABLE DATA           y   COPY public.historial_clinico (id_historial, id_paciente, enfermedad, fecha_diagnostico, tratamiento, notas) FROM stdin;
    public          postgres    false    232   Mo                 0    32794    medicos 
   TABLE DATA           |   COPY public.medicos (id_medico, nombre, apellido, especialidad, telefono, email, num_colegiado, fecha_registro) FROM stdin;
    public          postgres    false    218   /p                 0    32781 	   pacientes 
   TABLE DATA           �   COPY public.pacientes (id_paciente, nombre, apellido, fecha_nacimiento, sexo, direccion, telefono, email, fecha_registro) FROM stdin;
    public          postgres    false    216   �s                  0    32938    recipe 
   TABLE DATA           T   COPY public.recipe (id_recipe, id_consulta, fecha_emision, medicamento) FROM stdin;
    public          postgres    false    230   �w                 0    32806    usuarios 
   TABLE DATA           _   COPY public.usuarios (id_usuario, nombre_usuario, password, rol, id_medico, email) FROM stdin;
    public          postgres    false    220   �w       2           0    0    citas_id_cita_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.citas_id_cita_seq', 7, true);
          public          postgres    false    221            3           0    0    consultas_id_consulta_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.consultas_id_consulta_seq', 1, false);
          public          postgres    false    223            4           0    0    detalle_factura_id_detalle_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.detalle_factura_id_detalle_seq', 1, false);
          public          postgres    false    227            5           0    0    facturacion_id_factura_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.facturacion_id_factura_seq', 1, false);
          public          postgres    false    225            6           0    0 "   historial_clinico_id_historial_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.historial_clinico_id_historial_seq', 3, true);
          public          postgres    false    231            7           0    0    medicos_id_medico_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.medicos_id_medico_seq', 20, true);
          public          postgres    false    217            8           0    0    pacientes_id_paciente_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.pacientes_id_paciente_seq', 20, true);
          public          postgres    false    215            9           0    0    recipe_id_recipe_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.recipe_id_recipe_seq', 1, false);
          public          postgres    false    229            :           0    0    usuarios_id_usuario_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 5, true);
          public          postgres    false    219            m           2606    32830    citas citas_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id_cita);
 :   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_pkey;
       public            postgres    false    222            o           2606    32850    consultas consultas_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_pkey PRIMARY KEY (id_consulta);
 B   ALTER TABLE ONLY public.consultas DROP CONSTRAINT consultas_pkey;
       public            postgres    false    224            s           2606    32928 $   detalle_factura detalle_factura_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_pkey PRIMARY KEY (id_detalle);
 N   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_pkey;
       public            postgres    false    228            q           2606    32908    facturacion facturacion_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.facturacion
    ADD CONSTRAINT facturacion_pkey PRIMARY KEY (id_factura);
 F   ALTER TABLE ONLY public.facturacion DROP CONSTRAINT facturacion_pkey;
       public            postgres    false    226            w           2606    32958 (   historial_clinico historial_clinico_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.historial_clinico
    ADD CONSTRAINT historial_clinico_pkey PRIMARY KEY (id_historial);
 R   ALTER TABLE ONLY public.historial_clinico DROP CONSTRAINT historial_clinico_pkey;
       public            postgres    false    232            a           2606    32802    medicos medicos_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.medicos DROP CONSTRAINT medicos_email_key;
       public            postgres    false    218            c           2606    32804 !   medicos medicos_num_colegiado_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_num_colegiado_key UNIQUE (num_colegiado);
 K   ALTER TABLE ONLY public.medicos DROP CONSTRAINT medicos_num_colegiado_key;
       public            postgres    false    218            e           2606    32800    medicos medicos_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_pkey PRIMARY KEY (id_medico);
 >   ALTER TABLE ONLY public.medicos DROP CONSTRAINT medicos_pkey;
       public            postgres    false    218            \           2606    32792    pacientes pacientes_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.pacientes DROP CONSTRAINT pacientes_email_key;
       public            postgres    false    216            ^           2606    32790    pacientes pacientes_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id_paciente);
 B   ALTER TABLE ONLY public.pacientes DROP CONSTRAINT pacientes_pkey;
       public            postgres    false    216            u           2606    32944    recipe recipe_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id_recipe);
 <   ALTER TABLE ONLY public.recipe DROP CONSTRAINT recipe_pkey;
       public            postgres    false    230            g           2606    32965    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public            postgres    false    220            i           2606    32814 $   usuarios usuarios_nombre_usuario_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_nombre_usuario_key UNIQUE (nombre_usuario);
 N   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_nombre_usuario_key;
       public            postgres    false    220            k           2606    32812    usuarios usuarios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    220            _           1259    32936    idx_medicos_especialidad    INDEX     T   CREATE INDEX idx_medicos_especialidad ON public.medicos USING btree (especialidad);
 ,   DROP INDEX public.idx_medicos_especialidad;
       public            postgres    false    218            Z           1259    32935    idx_pacientes_email    INDEX     J   CREATE INDEX idx_pacientes_email ON public.pacientes USING btree (email);
 '   DROP INDEX public.idx_pacientes_email;
       public            postgres    false    216            y           2606    32836    citas citas_id_medico_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medicos(id_medico) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_id_medico_fkey;
       public          postgres    false    218    222    4709            z           2606    32831    citas citas_id_paciente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_id_paciente_fkey;
       public          postgres    false    4702    222    216            {           2606    32856 "   consultas consultas_id_medico_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medicos(id_medico) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.consultas DROP CONSTRAINT consultas_id_medico_fkey;
       public          postgres    false    218    224    4709            |           2606    32851 $   consultas consultas_id_paciente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.consultas DROP CONSTRAINT consultas_id_paciente_fkey;
       public          postgres    false    224    4702    216                       2606    32929 /   detalle_factura detalle_factura_id_factura_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.facturacion(id_factura) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_id_factura_fkey;
       public          postgres    false    226    4721    228            }           2606    32914 (   facturacion facturacion_id_consulta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturacion
    ADD CONSTRAINT facturacion_id_consulta_fkey FOREIGN KEY (id_consulta) REFERENCES public.consultas(id_consulta) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.facturacion DROP CONSTRAINT facturacion_id_consulta_fkey;
       public          postgres    false    224    4719    226            ~           2606    32909 (   facturacion facturacion_id_paciente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturacion
    ADD CONSTRAINT facturacion_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.facturacion DROP CONSTRAINT facturacion_id_paciente_fkey;
       public          postgres    false    216    226    4702            �           2606    32959 4   historial_clinico historial_clinico_id_paciente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_clinico
    ADD CONSTRAINT historial_clinico_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.historial_clinico DROP CONSTRAINT historial_clinico_id_paciente_fkey;
       public          postgres    false    4702    232    216            �           2606    32945    recipe recipe_id_consulta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_id_consulta_fkey FOREIGN KEY (id_consulta) REFERENCES public.consultas(id_consulta) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.recipe DROP CONSTRAINT recipe_id_consulta_fkey;
       public          postgres    false    4719    224    230            x           2606    32815     usuarios usuarios_id_medico_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medicos(id_medico) ON DELETE SET NULL;
 J   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_id_medico_fkey;
       public          postgres    false    4709    220    218               �   x�]�A
�0���sKf4j�z�B�ݤqA�M#��5�����k6�^�HY����W��`A���u��A���,O�r �d	Hy����=wc�*�L̊��!q��>�=L
W0�L����P���ܥ��f#�����7�3����0���g��t�A=.J�CUN            x������ � �            x������ � �            x������ � �      "   �   x�U��N1Eמ������P��eW		�d�ƦXJ��d��d@�`eɾ:�x�{8Z4G<�Y�.��|�o6�z^�ۛd�ǈ��Jn��Pj#K*���0XF�؜�5e�a�;x��E9+]��G�V�{�	N�Lȫ�T���I��TQ~�E�{�`O��s�Z��i�Z��25��Z�%R�(���?1�k���57L��6���n�a�� a�         L  x�m��R1���S�g�9I�7U&�P��ϲswrtg�F� e
*��~��,k<���?v��'
�|��h�^k�aVJWzsx�!�c��I�8�OK6���J5���5L�nƔ�816��FgQ����<���p�;�2��˕�����1����	s�a�c�1M�z)M��Z#���F�j�y��x8g� &��8 YN�@|��5�i���f��LU#K�S�a�R(��ԃ6 YN�@��(���ja����i�{ax8ǋ�PF���m��UO��])���3����u'��#pn�'	ԃ��^P,$r�Ao�����gVouw�?�8����z){Y ���d�j�0K�d%�j'�N�p+wƃ$�Edl���i���8��^\~��6�`�5oՏ����&Y���(���Oʖ�~�m�`��T�&Y^pT��/�Q�׊�I�l���ļ,&84�
Wr!*�)�f0Qfg�Me�F��|RQ衊ԃ6t<O2�]�zۅS�W���{a0_�V��"Q��O�I3C��i2o�(�s��eýF�3�="��^CZԄ6����ǙEc�_i��1�V�W��؁��с�*��0�86��-���g�mV;Y� ��GC�k�Ī�2�:v��O,���j�����3�>7k���.��.-im�v�&v ?�hW�R[	7�V�M��1�}ݫH%N$�m#q��Ȣ9��^�f	�|�M`�$A��qF}�Z���R��p�vr)̬e����*1��>ch���S��hx9�1��'��O�X~x�.DӇ�B?a�/���kM�e��ՠ#��B�[�8��[��h4�#�P^           x�}V�n�6\3_�}!���]5�i�Na$�vQts,1Y(;@�7Yf�E�OЏuH9�,�V�Ɛ5�3gfh����oĮL�ܿ4ꙉ�HC�"e�j�Z����F+�QvOu d�~H�D�4M�$�َ��h�O;�MT��\�!���?�ϙ�mL������%yJ���C�ϟ��g��oOd�$��$��(KVy��Q�%�y:���%vcj��=x���c>��Z[jk
�貢(��QK��vs>H%G����s����|�s��������n���T���V���PwԵ,�8N� +��{�.��PNdM�omT�~U��_�z��,A?��][�V���@pq�W�f�%�
9�9+&�ț�ߍ�*vy�H��t2� ����* �@�E�Y����=՚DYȋ�(g�Z-� �������u�d��Fu�V��2��	�d���@�~���*j��r���8�y���ʅq��̱�Z��,� !��1$.g[������@�4�'ˑ��j;��.�tK�̸_�(����*K�� ���vYbS#��l�jk�-���
����w���`�=�+]d �Ê:�P3f,.�x����
�Ю;���!n��w��),�� 
^2���Y��$~S!مV[þ��w)M]Q�b�ܿ����gcP�sk�|�����N;H����9�\��6��A��<��Άf��٘ ǝϠ8ײ�ܡbw�	_�v��F�"k��<�T�R��M�ҎZՍ&rev�BjN��OUMي��U�%���.]��GL��L����DO`Ά	�	[Ʈ]#7����-r�����\~4{��Ѥ����D���9�	]�. ����Aa랱�}���ڿT��u�R�&�W�`��f΋�����!����Q~������tK\���¹��X|�<96���Y(�	o���=�����_r�t�wrr.�`�c�3��l��u��s���i�����X4�4K�R,RyIM�(�r�?�L��� 1',NN������� �}�9             x������ � �         :   x�3�t�I�H�KI-�442615��MM�L����LK9d��&f��%��r��qqq �s     